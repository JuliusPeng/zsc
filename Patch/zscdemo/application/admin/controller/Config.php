<?php


namespace app\admin\controller;
use app\common\controller\Admin;

class Config extends Admin {

	public function _initialize() {
		parent::_initialize();
		$this->model = model('Config');
	}
	public function index() {
		$group = input('group', 0, 'trim');
		$name  = input('name', '', 'trim');
		/* ��ѯ������ʼ�� */
		$map          = array('status' => 1);
		if ($group) {
			$map['group'] = $group;
		}

		if ($name) {
			$map['name'] = array('like', '%' . $name . '%');
		}

		$list = $this->model->where($map)->order('id desc')->paginate(25);
		// ��¼��ǰ�б�ҳ��cookie
		Cookie('__forward__', $_SERVER['REQUEST_URI']);

		$data = array(
			'group'       => config('config_group_list'),
			'config_type' => config('config_config_list'),
			'page'        => $list->render(),
			'group_id'    => $group,
			'list'        => $list,
		);

		$this->assign($data);
		$this->setMeta('���ù���');
		return $this->fetch();
	}
	public function group($id = 1) {
		if (IS_POST) {
			$config = $this->request->post('config/a');
			$model  = model('Config');
			foreach ($config as $key => $value) {
				$model->where(array('name' => $key))->setField('value', $value);
			}
			//���db_config_data����
			cache('db_config_data', null);
			return $this->success("���³ɹ���");
		} else {
			$type = config('config_group_list');
			$list = db("Config")->where(array('status' => 1, 'group' => $id))->field('id,name,title,extra,value,remark,type')->order('sort')->select();
			if ($list) {
				$this->assign('list', $list);
			}
			$this->assign('id', $id);
			$this->setMeta($type[$id] . '����');
			return $this->fetch();
		}
	}
	public function add() {
		if (IS_POST) {
			$config = model('Config');
			$data   = $this->request->post();
			if ($data) {
				$id = $config->validate(true)->save($data);
				if ($id) {
					cache('db_config_data', null);
					//��¼��Ϊ
					action_log('update_config', 'config', $id, session('user_auth.uid'));
					return $this->success('�����ɹ�', url('index'));
				} else {
					return $this->error('����ʧ��');
				}
			} else {
				return $this->error($config->getError());
			}
		} else {
			$this->setMeta('��������');
			$this->assign('info', null);
			return $this->fetch('edit');
		}
	}
	public function edit($id = 0) {
		if (IS_POST) {
			$config = model('Config');
			$data   = $this->request->post();
			if ($data) {
				$result = $config->validate('Config.edit')->save($data, array('id' => $data['id']));
				if (false !== $result) {
					cache('db_config_data', null);
					//��¼��Ϊ
					action_log('update_config', 'config', $data['id'], session('user_auth.uid'));
					return $this->success('���³ɹ�', Cookie('__forward__'));
				} else {
					return $this->error($config->getError(), '');
				}
			} else {
				return $this->error($config->getError());
			}
		} else {
			$info = array();
			/* ��ȡ���� */
			$info = db('Config')->field(true)->find($id);

			if (false === $info) {
				return $this->error('��ȡ������Ϣ����');
			}
			$this->assign('info', $info);
			$this->setMeta('�༭����');
			return $this->fetch();
		}
	}
	public function save($config) {
		if ($config && is_array($config)) {
			$Config = db('Config');
			foreach ($config as $name => $value) {
				$map = array('name' => $name);
				$Config->where($map)->setField('value', $value);
			}
		}
		cache('db_config_data', null);
		return $this->success('����ɹ���');
	}
	public function del() {
		$id = array_unique((array) input('id', 0));

		if (empty($id)) {
			return $this->error('��ѡ��Ҫ����������!');
		}

		$map = array('id' => array('in', $id));
		if (db('Config')->where($map)->delete()) {
			cache('DB_CONFIG_DATA', null);
			//��¼��Ϊ
			action_log('update_config', 'config', $id, session('user_auth.uid'));
			return $this->success('ɾ���ɹ�');
		} else {
			return $this->error('ɾ��ʧ�ܣ�');
		}
	}
	public function sort() {
		if (IS_GET) {
			$ids = input('ids');
			//��ȡ���������
			$map = array('status' => array('gt', -1));
			if (!empty($ids)) {
				$map['id'] = array('in', $ids);
			} elseif (input('group')) {
				$map['group'] = input('group');
			}
			$list = db('Config')->where($map)->field('id,title')->order('sort asc,id asc')->select();

			$this->assign('list', $list);
			$this->setMeta('��������');
			return $this->fetch();
		} elseif (IS_POST) {
			$ids = input('post.ids');
			$ids = explode(',', $ids);
			foreach ($ids as $key => $value) {
				$res = db('Config')->where(array('id' => $value))->setField('sort', $key + 1);
			}
			if ($res !== false) {
				return $this->success('����ɹ���', Cookie('__forward__'));
			} else {
				return $this->error('����ʧ�ܣ�');
			}
		} else {
			return $this->error('�Ƿ�����');
		}
	}
}