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
  // DONE
  home: {
    slot1: {
      title: ['Dashboard', '�����ݷ���', '��˽��ȫ'],
      content: [
        '���������������Ĵ����ͱ������ݷ���ƽ̨',
        '�����˹����ܵĴ����ݷ���',
        '�������ݰ�ȫ�͸�����˽Ȩ'
      ]
    },
    slot2: {
    },
    slot3: {


    },
    slot4: {


    },
    slot5: {
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
    // DONE
    detail: {
      account: {
        title: '�˻���Ϣ',
        tip: {
          title: '��ȫ��ʾ',
          description: 'Ϊ�������˻���ȫ�����������ַ��������ȫ��֤����Ҫ͸¶���ź͹ȸ���֤����κ��ˣ�����Dashboard�ͷ���'
        },
        info: {
          title: ['�˻�', '�ϴε�¼ʱ��']
        }
      },
      security: {
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
    // DONE
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
