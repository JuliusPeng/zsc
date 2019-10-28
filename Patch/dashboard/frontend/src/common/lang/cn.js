
const cn = {
  header: {
    home: '��ҳ', // 1
    
    insurance: '����', // 2
    certificate: '¼��', // 21
    analytics: '����', // 22

    whitePaper: '��Ƥ��', // 3
    faq: '��������', // 4
    login: '��¼', // 5
    signUp: '���ע��', // 6
    
    // pic 7
    user: '��������', // 71
    logout: 'ע��', // 72
    
    lang: '���ģ����壩' // 8
  },
  login: {
    title: '�û���¼',
    account: '�������ֻ��Ż������ַ',
    password: '�������¼����',
    submit: '��¼',
    dialog: {
      title: '�ȸ���֤',
      placeholder: '������ȸ���֤��',
      buttonText: 'ȷ��'
    }
  },
  signUp: {
    phoneTitle: '�ֻ�ע��',
    emailTitle: '����ע��',
  },
  insurance: {
    aside: {
      slot: [
        {
          title: '���չ�˾',
          item: ['�й��˱�', '�й�ƽ��', '�й�̫ƽ��', '�й�����', '�»�����']
        }
      ]
    }
  },
  user: {
    aside: {
      slot: [
        {
          title: '������Ϣ',
          item: ['�˻��Ͱ�ȫ']
        },
        {
          title: '֧��',
          item: ['���ⷴ��', '�����б�']
        }
      ]
    },

    detail: {
      title: '�˻��Ͱ�ȫ',
      securityTip: {
        title: '��ȫ��ʾ',
        description: 'Ϊ�������˻���ȫ�����������ַ��������ȫ��֤����Ҫ͸¶���ź͹ȸ���֤����κ��ˣ�����Dashboard�ͷ�'
      },
      info: {
        title1: '�˻�',
        title2: '�ϴε�¼ʱ��'
      },
      securitySetting: {
        title: '��ȫ����',
        google: {
          title: '�ȸ���֤',
          description: '��¼ʱ�����йȸ���֤��',
          operation: {
            set: '����',
            reset: '����',
            open: '����'
          }
        }
      },
      dialog: {
        title: '�ȸ迪��',
        placeholder: '������ȸ���֤��',
        buttonText: 'ȷ��'
      }
    },

    google: {
      title: ['���� �ȸ���֤', '���� �ȸ���֤'],
      step: [
        {
          title: '��װ��ɺ��Google Authentication��ɨ���·���ά����ֶ�������Կ���õ�6λ����֤��',
          tip: '��������Ʊ��ܹȸ���֤��Կ�����������ʧ�ֻ������޷�����',
          qr: '��Կ'
        },
        {
          title: '�뽫����õ���֤�������·�������У��������֤',
        }
      ]
    }
  },
  company: {
  },
  message: {
    info: {},
    warning: {
      reLogin: '��δ��¼��֤����ڣ������µ�¼!',
    },
    error: {
      USER_HAS_EXIST: '�û��Ѵ��ڣ�',
      USER_NOT_EXIST: '�û�������!',
    },

  },
  component: {
    button: {
      confirm: 'ȷ��',
      cancel: 'ȡ��'
    },
    alert: {
      errorTitle: '����',
      warningTitle: '��ʾ'
    },
    loading: {
      login: '�û���¼��....',
      signUp: '�û�ע����....'
    }
  }
};
export default cn;
