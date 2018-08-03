<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

namespace app\index\controller;
use app\common\controller\Fornt;
use think\Cookie;
use think\Cache;
use think\Db;
class User extends Fornt{

	protected $model;

	protected $field;

	public function _initialize()
	{
		parent::_initialize();

		$this->model = model('user');
		$this->field  = $this->model->recognList;

		$account = Cookie::get('account');

		if(!preg_match("/^1[34578]\d{9}$/", $account) && $account!=null && $this->url!='index/user/loginout' && $this->url!='index/user/login' && $this->url!='index/user/register' && $this->url!='index/user/getCode'){
			$this->error($account);
		}
	}
	/**
	 * ��¼
	 * @return [type] [description]
	 */
	public function login()
	{
		$data = input('post.');

		//��¼��ʽ(�ֻ���,����)
		$res = $this->model->userLogin($data);
		if($res===true){
			//��ѯ��������Ϣ
			$this->assign('list',$this->model->recognizeeList());

			if(preg_match("/^1[34578]\d{9}$/", $data['account'])){
				return $this->personManage();
			}else{
				return action('company/companyInfo');
			}

		}elseif($res==-1){
			$this->error('û�и��û�',url('/'));
		}elseif($res==-2){
			$this->error('������ҵ��֤��δͨ��,������������ϵ13888888888',url('/'));
		}else{
			$this->error('�������',url('/'));
		}
	}
// /**
	//  * ��ȡ�û����
	//  * @return [type] [json]
	//  */
	// public function getUserType()
	// {
	// 	$account = input('post.account');

	// 	$r = Db::name('user')->where('account',$account)->find();

	// 	if(!empty($r)){
	// 		return $this->jsonSuc('��ȡ�ɹ�',$r);
	// 	}else{
	// 		return $this->jsonSuc('û�и��û�');
	// 	}
	// }
}
