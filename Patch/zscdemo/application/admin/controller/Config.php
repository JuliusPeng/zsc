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
}