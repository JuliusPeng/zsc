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
}