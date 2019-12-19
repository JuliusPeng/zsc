'use strict';

const cn = {
  header: {
    brand: 'Dashboard',

    home: '��ҳ', // 1

    insurance: '�����г�', // 2
    market: '���ռ���', // 21
    analytics: '���ݷ���', // 22

    whitePaper: '��Ƥ��', // 3
    faq: '��������', // 4
    login: '��¼', // 5
    signUp: '���ע��', // 6
    admin: '����Ա', // 6

    // pic 7
    user: '��������', // 71
    logout: 'ע��', // 72

    lang: '���ģ����壩' // 8
  },
  home: {
    menu1: {
      title1: 'Dashboard',
      page1: '���������������Ĵ����ͱ������ݷ���ƽ̨',
      title2: '�����ݷ���',
      page2: '�����˹����ܵĴ����ݷ���',
      title3: '��˽��ȫ',
      page3: '�������ݰ�ȫ�͸�����˽Ȩ'
    },

    menu2: {
      title: '��Ʒ����',
      page: 'Myinsura��һ�����������������Ĵ����ͱ������ݷ���ƽ̨���û��ͱ�����Ϣͨ��ƽ̨�������û���Ϣ��û�еõ��ṩ����Ȩ������˽�����ġ�ƽ̨����˹����ܶ��������ϵĴ����ݽ��ж��ƻ�������'
    },

    menu3: {
      title: '��Ʒ����',
    },

    menu4: {
      title: '��Ʒ��ɫ',

      page1: '��ͨ�û���ͨ��ƽ̨����Ŀǰ�������չ�˾�ı��ղ�Ʒ��ͨ�������ݷ������ҵ��ʺ��Լ��ı��ղ�Ʒ��',
      page2: 'Ϊ�����û���߼���Ա���ṩ������˽����������֧�ŷ������ݿ���������������֣����Ƹ��Ի���������׼Ӫ���ȣ���',
      page3: '�ṩƽ̨�ĸ��ֶ�������ģ��API��Ϊϵͳ���ƻ�������ϵͳ�����ṩ�ӿڶԽӷ���'
    },

    menu5: {
      title: '��ϵ��ʽ'
    }
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
    phonePlaceholder: '�������ֻ���',
    emailPlaceholder: '�����������ַ',
    getCode: '��ȡ��֤��',
    retrieveCode: '���»�ȡ',
    code: '������6λ��֤��',
    password: '����������',
    password2: '���ٴ���������',
    submit: 'ע��'
  },
  market: {
    // aside: {
    //   slot: [
    //     {
    //       title: '���չ�˾',
    //       item: ['�й��˱�', '�й�ƽ��', '�й�̫ƽ��', '�й�����', '�»�����']
    //     }
    //   ]
    // }
    pingan: {
      category: '�������ͣ�',
      period: '�������ޣ�',
      input: '¼���ҵı���'
    },
    picc: {
      category: '�������ͣ�',
      age: '�������䣺',
      period: '�������ޣ�',
      input: '¼���ҵı���'
    },
    dialog: {
      title: '�ҵı���',
      product: {
        title: '��Ʒ��Ϣ',
        company: '��˾����',
        category: '��Ʒ���',
        name: '��Ʒ����'
      },
      user: {
      },
      policy: {
        title: '������Ϣ',
      }
    }
  },
  user: {
    aside: {
      slot: [
        {
          title: '������Ϣ',
          item: ['�˻��Ͱ�ȫ', '�ҵı���']
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
          text: '��װ��ɺ�򿪹ȸ���֤��ɨ���·���ά����ֶ�������Կ���õ�6λ����֤�롣',
          tip: {
            title: '��ȫ��ʾ',
            description: '��������Ʊ��ܹȸ���֤��Կ�����������ʧ�ֻ������޷�����'
          },
          qr: '��Կ'
        },
        {
          text: '�뽫����õ���֤�������·�������У��������֤��',
          form: {
            label: '�¹ȸ���֤��',
            placeholder: '�������¹ȸ���֤��',
            buttonText: 'ȷ��'
          }
        }
      ]
    },
    policy: {
      // the content follow same as market.dialog
    }
  },
  notFound: {
    content: '�����ʵ�ҳ�治����!',
    back: '������ҳ'
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
      cancel: 'ȡ��',
      save: '����'
    },
    alert: {
      errorTitle: '����',
      warningTitle: '��ʾ'
    },
    loading: {
      login: '�û���¼��......',
      signUp: '�û�ע����......',
      insurance: '���ղ�Ʒ��ȡ��......',
      analytics: '�����ݷ�����........'
    }
  }
};
export default cn;
