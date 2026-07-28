import { useAuth } from '@/hooks/auth-hooks';
import {
  useLogin,
  useLoginChannels,
  useLoginWithChannel,
  useRegister,
} from '@/hooks/use-login-request';
import { useSystemConfig } from '@/hooks/use-system-request';
import { rsaPsw } from '@/utils';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button, ButtonLoading } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Check } from 'lucide-react';
import { z } from 'zod';
import { NICKNAME_PATTERN } from '../user-setting/profile/constants';
import SvgIcon from '@/components/svg-icon';
import './index.less';

type LoginFormContentProps = {
  isLoginPage: boolean;
  title: string;
  form: UseFormReturn<any>;
  loading: boolean;
  onCheck: (params: any) => Promise<void>;
  changeTitle: () => void;
  registerEnabled: boolean;
  channels: { channel: string; icon?: string; display_name: string }[];
  handleLoginWithChannel: (channel: string) => void;
  t: ReturnType<typeof useTranslation>['t'];
  disablePasswordLogin?: boolean;
};

function PromoPanel({
  t,
}: {
  t: ReturnType<typeof useTranslation>['t'];
}) {
  const features = [
    t('featureRetrieval'),
    t('featureKnowledge'),
    t('featureWorkflow'),
  ];

  return (
    <div className="login-promo-panel relative hidden lg:flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="login-grid-bg absolute inset-0 pointer-events-none" />
      <div className="login-glow absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-12 max-w-[560px]">
        <div className="w-20 h-20 mb-8 flex items-center justify-center">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <rect
              x="12"
              y="12"
              width="24"
              height="24"
              rx="4"
              stroke="currentColor"
              strokeWidth="3"
            />
            <rect
              x="44"
              y="12"
              width="24"
              height="24"
              rx="4"
              stroke="currentColor"
              strokeWidth="3"
            />
            <rect
              x="12"
              y="44"
              width="24"
              height="24"
              rx="4"
              stroke="currentColor"
              strokeWidth="3"
            />
            <rect
              x="44"
              y="44"
              width="24"
              height="24"
              rx="4"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle cx="36" cy="24" r="3" fill="currentColor" />
            <circle cx="36" cy="56" r="3" fill="currentColor" />
            <circle cx="24" cy="36" r="3" fill="currentColor" />
            <circle cx="56" cy="36" r="3" fill="currentColor" />
            <path
              d="M36 24H44M36 56H44M24 36H12M56 36H68"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-semibold mb-6 leading-tight">
          {t('promoTitle')}
        </h2>
        <p className="text-base text-white/85 mb-10 leading-relaxed">
          {t('promoDescription')}
        </p>

        <div className="w-full space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-left"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginFormContent({
  isLoginPage,
  title,
  form,
  loading,
  onCheck,
  changeTitle,
  registerEnabled,
  channels,
  handleLoginWithChannel,
  t,
  disablePasswordLogin,
}: LoginFormContentProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[420px] mx-auto px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          {title === 'login' ? t('loginTitle') : t('signUpTitle')}
        </h2>
        <p className="text-text-secondary text-sm">
          {title === 'login' ? t('loginDescription') : t('registerDescription')}
        </p>
      </div>

      <div className="w-full">
        {!disablePasswordLogin && (
          <Form {...form}>
            <form
              className="flex flex-col gap-6 text-text-primary"
              data-testid="auth-form"
              data-active={isLoginPage ? 'true' : 'false'}
              onSubmit={form.handleSubmit(onCheck)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="auth-email"
                        placeholder={t('emailPlaceholder')}
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {title === 'register' && (
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>{t('nicknameLabel')}</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="auth-nickname"
                          placeholder={t('nicknamePlaceholder')}
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('passwordLabel')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          data-testid="auth-password"
                          type={'password'}
                          placeholder={t('passwordPlaceholder')}
                          autoComplete={
                            title === 'login'
                              ? 'current-password'
                              : 'new-password'
                          }
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {title === 'login' && (
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2 group">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                            className="group-hover:border-border-default group-hover:bg-border-button"
                          />
                        </FormControl>
                        <FormLabel
                          className={cn('cursor-pointer', {
                            'text-text-disabled': !field.value,
                            'text-text-primary': field.value,
                          })}
                        >
                          {t('rememberMe')}
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <ButtonLoading
                data-testid="auth-submit"
                type="submit"
                loading={loading}
                className="w-full h-11 mt-2 bg-[#1677ff] hover:bg-[#4096ff] text-white border-none rounded-lg text-base font-medium"
              >
                {title === 'login' ? t('login') : t('continue')}
              </ButtonLoading>
            </form>
          </Form>
        )}

        {title === 'login' && channels && channels.length > 0 && (
          <div className={disablePasswordLogin ? 'py-8' : 'mt-6 border-t pt-6'}>
            {channels.map((item) => (
              <Button
                variant={'transparent'}
                key={item.channel}
                onClick={() => handleLoginWithChannel(item.channel)}
                style={{ marginTop: 10 }}
                className={disablePasswordLogin ? 'w-full' : ''}
              >
                <div className="flex items-center">
                  <SvgIcon
                    name={item.icon || 'sso'}
                    width={20}
                    height={20}
                    style={{ marginRight: 5 }}
                  />
                  Sign in with {item.display_name}
                </div>
              </Button>
            ))}
          </div>
        )}

        {!disablePasswordLogin && title === 'login' && registerEnabled && (
          <div className="mt-8 text-center">
            <p className="text-text-disabled text-sm">
              {t('signInTip')}
              <Button
                data-testid="auth-toggle-register"
                variant={'transparent'}
                onClick={changeTitle}
                className="text-[#1677ff] hover:text-[#4096ff] hover:bg-transparent font-medium border-none transition-colors duration-200 px-1"
              >
                {t('signUp')}
              </Button>
            </p>
          </div>
        )}
        {!disablePasswordLogin && title === 'register' && (
          <div className="mt-8 text-center">
            <p className="text-text-disabled text-sm">
              {t('signUpTip')}
              <Button
                data-testid="auth-toggle-login"
                variant={'transparent'}
                onClick={changeTitle}
                className="text-[#1677ff] hover:text-[#4096ff] hover:bg-transparent font-medium border-none transition-colors duration-200 px-1"
              >
                {t('login')}
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const Login = () => {
  const [title, setTitle] = useState('login');
  const navigate = useNavigate();
  const { login, loading: signLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();
  const { channels, loading: channelsLoading } = useLoginChannels();
  const { login: loginWithChannel, loading: loginWithChannelLoading } =
    useLoginWithChannel();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const { t: tSetting } = useTranslation('translation', {
    keyPrefix: 'setting',
  });
  const [isLoginPage, setIsLoginPage] = useState(true);

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
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleLoginWithChannel = async (channel: string) => {
    await loginWithChannel(channel);
  };

  const changeTitle = () => {
    setIsLoginPage(title !== 'login');
    if (title === 'login' && !registerEnabled) {
      return;
    }

    setTimeout(() => {
      setTitle(title === 'login' ? 'register' : 'login');
    }, 200);
  };

  const FormSchema = z
    .object({
      nickname: z.string().optional(),
      email: z
        .string()
        .email()
        .min(1, { message: t('emailPlaceholder') }),
      password: z.string().min(1, { message: t('passwordPlaceholder') }),
      remember: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      if (title !== 'register') return;
      if (!data.nickname) {
        ctx.addIssue({
          path: ['nickname'],
          message: 'nicknamePlaceholder',
          code: z.ZodIssueCode.custom,
        });
        return;
      }
      if (!NICKNAME_PATTERN.test(data.nickname)) {
        ctx.addIssue({
          path: ['nickname'],
          message: tSetting('usernameInvalidCharacters'),
          code: z.ZodIssueCode.custom,
        });
      }
    });
  type FormValues = z.infer<typeof FormSchema>;
  const form = useForm<FormValues>({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      remember: false,
    },
    resolver: zodResolver(FormSchema),
  });

  const onCheck = async (params: FormValues) => {
    try {
      const rsaPassWord = rsaPsw(params.password) as string;

      if (title === 'login') {
        const code = await login({
          email: `${params.email}`.trim(),
          password: rsaPassWord,
        });
        if (code === 0) {
          navigate('/');
        }
      } else {
        const code = await register({
          nickname: params.nickname || '',
          email: params.email,
          password: rsaPassWord,
        });
        if (code === 0) {
          setTitle('login');
          setIsLoginPage(true);
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <LoginFormContent
          isLoginPage={isLoginPage}
          title={title}
          form={form}
          loading={loading}
          onCheck={onCheck}
          changeTitle={changeTitle}
          registerEnabled={registerEnabled}
          channels={channels || []}
          handleLoginWithChannel={handleLoginWithChannel}
          t={t}
          disablePasswordLogin={!!config?.disablePasswordLogin}
        />
      </div>
      <PromoPanel t={t} />
    </div>
  );
};

export default Login;
