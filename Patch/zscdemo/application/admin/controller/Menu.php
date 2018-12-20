<?php


namespace app\admin\controller;
use app\common\controller\Admin;

class Menu extends Admin {

	public function _initialize() {
		parent::_initialize();
	}

	public function index() {
		$map   = array();
		$title = trim(input('get.title'));
		$list  = db("Menu")->where($map)->field(true)->order('sort asc,id asc')->column('*', 'id');
		int_to_string($list, array('hide' => array(1 => '是', 0 => '否'), 'is_dev' => array(1 => '是', 0 => '否')));

		if (!empty($list)) {
			$tree = new \com\Tree();
			$list = $tree->toFormatTree($list);
		}
		// 记录当前列表页的cookie
		Cookie('__forward__', $_SERVER['REQUEST_URI']);

		$this->setMeta('菜单列表');
		$this->assign('list', $list);
		return $this->fetch();
	}	

	public function editable($name = null, $value = null, $pk = null) {
		if ($name && ($value != null || $value != '') && $pk) {
			db('Menu')->where(array('id' => $pk))->setField($name, $value);
		}
	}	

	public function add() {
		if (IS_POST) {
			$Menu = model('Menu');
			$data = input('post.');
			$id   = $Menu->save($data);
			if ($id) {
				session('admin_menu_list', null);
				//记录行为
				action_log('update_menu', 'Menu', $id, session('user_auth.uid'));
				return $this->success('新增成功', Cookie('__forward__'));
			} else {
				return $this->error('新增失败');
			}
		} else {
			$this->assign('info', array('pid' => input('pid')));
			$menus = db('Menu')->select();
			$tree  = new \com\Tree();
			$menus = $tree->toFormatTree($menus);
			if (!empty($menus)) {
				$menus = array_merge(array(0 => array('id' => 0, 'title_show' => '顶级菜单')), $menus);
			} else {
				$menus = array(0 => array('id' => 0, 'title_show' => '顶级菜单'));
			}

			$this->assign('Menus', $menus);
			$this->setMeta('新增菜单');
			return $this->fetch('edit');
		}
	}	
}