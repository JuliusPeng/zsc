<?php

namespace app\admin\controller;
use app\common\controller\Admin;

class Group extends Admin {

	protected $model;
	protected $rule;

	public function _initialize() {
		parent::_initialize();
		$this->group = model('AuthGroup');
		$this->rule  = model('AuthRule');
	}
	//��Ա������ҳ������
	public function index($type = 'admin') {
		$map['module'] = $type;

		$list = db('AuthGroup')->where($map)->order('id desc')->paginate(10);

		$data = array(
			'list' => $list,
			'page' => $list->render(),
			'type' => $type,
		);
		$this->assign($data);
		$this->setMeta('�û������');
		return $this->fetch();
	}
	//��Ա������ӿ�����
	public function add($type = 'admin') {
		if (IS_POST) {
			$result = $this->group->change();
			if ($result) {
				return $this->success("��ӳɹ���", url('admin/group/index'));
			} else {
				return $this->error("���ʧ�ܣ�");
			}
		} else {
			$data = array(
				'info'    => array('module' => $type, 'status' => 1),
				'keyList' => $this->group->keyList,
			);
			$this->assign($data);
			$this->setMeta('����û���');
			return $this->fetch('public/edit');
		}
	}
	//��Ա����༭������
	public function edit($id) {
		if (!$id) {
			return $this->error("�Ƿ�������");
		}
		if (IS_POST) {
			$result = $this->group->change();
			if ($result) {
				return $this->success("�༭�ɹ���", url('admin/group/index'));
			} else {
				return $this->error("�༭ʧ�ܣ�");
			}
		} else {
			$info = $this->group->where(array('id' => $id))->find();
			$data = array(
				'info'    => $info,
				'keyList' => $this->group->keyList,
			);
			$this->assign($data);
			$this->setMeta('�༭�û���');
			return $this->fetch('public/edit');
		}
	}
	//��Ա����༭�ֶο�����
	public function editable() {
		$pk     = input('pk', '', 'trim,intval');
		$name   = input('name', '', 'trim');
		$value  = input('value', '', 'trim');
		$result = $this->group->where(array('id' => $pk))->setField($name, $value);
		if ($result) {
			return $this->success("ɾ���ɹ���");
		} else {
			return $this->error("ɾ��ʧ�ܣ�");
		}
	}
	//��Ա����ɾ��������
	public function del() {
		$id = $this->getArrayParam('id');
		if (empty($id)) {
			return $this->error("�Ƿ�������");
		}
		$result = $this->group->where(array('id' => array('IN', $id)))->delete();
		if ($result) {
			return $this->success("ɾ���ɹ���");
		} else {
			return $this->error("ɾ��ʧ�ܣ�");
		}
	}
	//Ȩ�޽ڵ������
	public function access($type = 'admin') {
		$map['module'] = $type;

		$list = db('AuthRule')->where($map)->order('id desc')->paginate(15);

		$data = array(
			'list' => $list,
			'page' => $list->render(),
			'type' => $type,
		);
		$this->assign($data);
		$this->setMeta('Ȩ�޽ڵ�');
		return $this->fetch();
	}
	//���ݲ˵����½ڵ�
	public function upnode($type) {
		$rule = model('Menu')->getAuthNodes($type);
		$reuslt = $this->rule->uprule($rule, $type);
		return $this->success("���³ɹ���");
	}
	/**
	 * ��Ȩ
	 */
	public function auth($id) {
		if (!$id) {
			return $this->error("�Ƿ�������");
		}
		if (IS_POST) {
			$rule          = $this->request->post('rule/a', array());
			$extend_rule   = $this->request->post('extend_rule/a', array());
			$extend_result = $rule_result = false;
			//��չȨ��
			$extend_data = array();
			foreach ($extend_rule as $key => $value) {
				foreach ($value as $item) {
					$extend_data[] = array('group_id' => $id, 'extend_id' => $item, 'type' => $key);
				}
			}
			if (!empty($extend_data)) {
				db('AuthExtend')->where(array('group_id' => $id))->delete();
				$extend_result = db('AuthExtend')->insertAll($extend_data);
			}
			if ($rule) {
				$rules       = implode(',', $rule);
				$rule_result = $this->group->where(array('id' => $id))->setField('rules', $rules);
			}

			if ($rule_result !== false || $extend_result !== false) {
				return $this->success("��Ȩ�ɹ���", url('admin/group/index'));
			} else {
				return $this->error("��Ȩʧ�ܣ�");
			}
		} else {
			$group = $this->group->where(array('id' => $id))->find();

			$map['module'] = $group['module'];
			$row           = db('AuthRule')->where($map)->order('id desc')->select();

			$list = array();
			foreach ($row as $key => $value) {
				$list[$value['group']][] = $value;
			}
			//ģ��
			$model = db('model')->field('id,title,name')
				->where(array('status' => array('gt', 0), 'extend' => array('gt', 0)))
				->select();
			//��չȨ��
			$extend_auth = db('AuthExtend')->where(array('group_id' => $id, 'type' => 2))->column('extend_id');
			$data        = array(
				'list'        => $list,
				'model'       => $model,
				'extend_auth' => $extend_auth,
				'auth_list'   => explode(',', $group['rules']),
				'id'          => $id,
			);
			$this->assign($data);
			$this->setMeta('��Ȩ');
			return $this->fetch();
		}
	}
	public function addnode($type = 'admin') {
		if (IS_POST) {
			$result = $this->rule->change();
			if ($result) {
				return $this->success("�����ɹ���", url('admin/group/access'));
			} else {
				return $this->error($this->rule->getError());
			}
		} else {
			$data = array(
				'info'    => array('module' => $type, 'status' => 1),
				'keyList' => $this->rule->keyList,
			);
			$this->assign($data);
			$this->setMeta('��ӽڵ�');
			return $this->fetch('public/edit');
		}
	}
	public function editnode($id) {
		if (IS_POST) {
			$result = $this->rule->change();
			if (false !== $result) {
				return $this->success("���³ɹ���", url('admin/group/access'));
			} else {
				return $this->error("����ʧ�ܣ�");
			}
		} else {
			if (!$id) {
				return $this->error("�Ƿ�������");
			}
			$info = $this->rule->find($id);
			$data = array(
				'info'    => $info,
				'keyList' => $this->rule->keyList,
			);
			$this->assign($data);
			$this->setMeta('�༭�ڵ�');
			return $this->fetch('public/edit');
		}
	}
}