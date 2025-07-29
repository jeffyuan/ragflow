import SvgIcon from '@/components/svg-icon';
import { useAuth } from '@/hooks/auth-hooks';
import {
  useLogin,
  useLoginChannels,
  useLoginWithChannel,
  useRegister,
} from '@/hooks/login-hooks';
import { useSystemConfig } from '@/hooks/system-hooks';
import { rsaPsw } from '@/utils';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'umi';
import RightPanel from './right-panel';

import styles from './index.less';

const Login = () => {
  const [title, setTitle] = useState('login');
  const navigate = useNavigate();
  const { login, loading: signLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();
  const { channels, loading: channelsLoading } = useLoginChannels();
  const { login: loginWithChannel, loading: loginWithChannelLoading } =
    useLoginWithChannel();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const loading =
    signLoading ||
    registerLoading ||
    channelsLoading ||
    loginWithChannelLoading;
  const { config } = useSystemConfig();
  const registerEnabled = config?.registerEnabled !== 0;

  const { isLogin } = useAuth();
  useEffect(() => {
    if (isLogin) {
      navigate('/knowledge');
    }
  }, [isLogin, navigate]);

  const handleLoginWithChannel = async (channel: string) => {
    await loginWithChannel(channel);
  };

  const changeTitle = () => {
    if (title === 'login' && !registerEnabled) {
      return;
    }
    setTitle((title) => (title === 'login' ? 'register' : 'login'));
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [form]);

  const onCheck = async () => {
    try {
      const params = await form.validateFields();

      const rsaPassWord = rsaPsw(params.password) as string;

      if (title === 'login') {
        const code = await login({
          email: `${params.email}`.trim(),
          password: rsaPassWord,
        });
        if (code === 0) {
          navigate('/knowledge');
        }
      } else {
        const code = await register({
          nickname: params.nickname,
          email: params.email,
          password: rsaPassWord,
        });
        if (code === 0) {
          setTitle('login');
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* 左侧登录区域 */}
      <div className={styles.loginPanel}>
        <div className={styles.loginWrapper}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {title === 'login' ? t('login') : t('register')}
            </h2>
            <p className={styles.formSubtitle}>
              {title === 'login'
                ? t('loginDescription')
                : t('registerDescription')}
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            name="login_form"
            className={styles.formContainer}
          >
            <Form.Item
              name="email"
              label={t('emailLabel')}
              rules={[{ required: true, message: t('emailPlaceholder') }]}
            >
              <Input
                size="large"
                placeholder={t('emailPlaceholder')}
                className={styles.inputField}
              />
            </Form.Item>

            {title === 'register' && (
              <Form.Item
                name="nickname"
                label={t('nicknameLabel')}
                rules={[{ required: true, message: t('nicknamePlaceholder') }]}
              >
                <Input
                  size="large"
                  placeholder={t('nicknamePlaceholder')}
                  className={styles.inputField}
                />
              </Form.Item>
            )}

            <Form.Item
              name="password"
              label={t('passwordLabel')}
              rules={[{ required: true, message: t('passwordPlaceholder') }]}
            >
              <Input.Password
                size="large"
                placeholder={t('passwordPlaceholder')}
                onPressEnter={onCheck}
                className={styles.inputField}
              />
            </Form.Item>

            <div className={styles.actionRow}>
              {title === 'login' && (
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>{t('rememberMe')}</Checkbox>
                </Form.Item>
              )}
            </div>

            <Button
              type="primary"
              block
              size="large"
              onClick={onCheck}
              loading={loading}
              className={styles.submitButton}
            >
              {title === 'login' ? t('login') : t('continue')}
            </Button>

            <div className={styles.switchMode}>
              {title === 'login' && registerEnabled && (
                <div>
                  {t('signInTip')}
                  <Button type="link" onClick={changeTitle}>
                    {t('signUp')}
                  </Button>
                </div>
              )}
              {title === 'register' && (
                <div>
                  {t('signUpTip')}
                  <Button type="link" onClick={changeTitle}>
                    {t('login')}
                  </Button>
                </div>
              )}
            </div>

            {title === 'login' && channels && channels.length > 0 && (
              <div className={styles.thirdPartyAuth}>
                <div className={styles.divider}>
                  <span>其他登录方式</span>
                </div>
                {channels.map((item) => (
                  <Button
                    key={item.channel}
                    block
                    size="large"
                    onClick={() => handleLoginWithChannel(item.channel)}
                    className={styles.authButton}
                  >
                    <div className={styles.buttonContent}>
                      <SvgIcon
                        name={item.icon || 'sso'}
                        width={16}
                        height={16}
                      />
                      <span>Sign in with {item.display_name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </Form>
        </div>
      </div>

      {/* 右侧内容面板 */}
      <div className={styles.contentPanel}>
        <RightPanel />
      </div>
    </div>
  );
};

export default Login;
