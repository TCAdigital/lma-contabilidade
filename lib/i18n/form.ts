import type { Locale } from './index';

// Textos do fluxo de contratação (/contratar, /entrar, /minha-conta). Prototipo front-end.
export type FormDict = {
  brandAria: string;
  topTitle: string;
  stepOf: (c: number, t: number) => string;
  back: string;
  next: string;
  finish: string;
  langLabel: string;
  required: string;
  planLabel: string;
  consulta: string;
  stepNames: { pessoais: string; empresa: string; documentos: string; pagamento: string };
  pessoais: {
    title: string;
    subtitle: string;
    nome: { label: string; ph: string; err: string };
    email: { label: string; ph: string; err: string };
    celular: { label: string; ph: string; err: string };
    senha: { label: string; help: string; err: string };
    senha2: { label: string; err: string };
    panelTitle: string;
    panelText: string;
  };
  empresa: {
    title: string;
    subtitle: string;
    atividade: { label: string; ph: string; options: string[] };
    cep: { label: string; help: string; ph: string; err: string };
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    situacao: { label: string; options: string[] };
    panelTitle: string;
    panelText: string;
  };
  documentos: {
    title: string;
    subtitle: string;
    dropTitle: string;
    dropHint: string;
    formats: string;
    required: string[];
    pending: string;
    sent: string;
    replace: string;
    panelTitle: string;
    panelText: string;
  };
  pagamento: {
    title: string;
    subtitle: string;
    methodLabel: string;
    methods: string[];
    card: { num: string; name: string; exp: string; cvv: string };
    note: string;
    summaryTitle: string;
    panelTitle: string;
    panelText: string;
  };
  sucesso: { title: string; message: string; next: string; account: string };
  login: {
    title: string;
    subtitle: string;
    email: { label: string; ph: string };
    senha: { label: string; ph: string };
    submit: string;
    noAccount: string;
    create: string;
    error: string;
  };
  conta: {
    title: string;
    greeting: (name: string) => string;
    statusLabel: string;
    statusValue: string;
    edit: string;
    save: string;
    cancel: string;
    logout: string;
    secPessoais: string;
    secEmpresa: string;
    secDocumentos: string;
    secPlano: string;
    empty: string;
    goContratar: string;
  };
};

const pt: FormDict = {
  brandAria: 'LMA Contabilidade',
  topTitle: 'Contratar plano',
  stepOf: (c, t) => `${c}/${t}`,
  back: 'Voltar',
  next: 'Avançar',
  finish: 'Concluir',
  langLabel: 'Idioma',
  required: 'Campo obrigatório.',
  planLabel: 'Plano selecionado',
  consulta: 'Sob consulta',
  stepNames: { pessoais: 'Dados pessoais', empresa: 'Dados da empresa', documentos: 'Documentos', pagamento: 'Pagamento' },
  pessoais: {
    title: 'Dados pessoais',
    subtitle: 'Para continuar, precisamos saber um pouco mais sobre você.',
    nome: { label: 'Nome completo', ph: 'Seu nome e sobrenome', err: 'Informe seu nome e sobrenome.' },
    email: { label: 'E-mail', ph: 'voce@email.com', err: 'Informe um e-mail válido.' },
    celular: { label: 'Celular', ph: '(11) 90000-0000', err: 'Informe seu celular.' },
    senha: { label: 'Criar senha', help: 'Você usará este e-mail e senha para acompanhar e editar sua solicitação.', err: 'A senha deve ter ao menos 6 caracteres.' },
    senha2: { label: 'Confirmar senha', err: 'As senhas não coincidem.' },
    panelTitle: 'Boas-vindas!',
    panelText: 'Sua contratação começa aqui. Vamos reunir seus dados para a equipe LMA preparar o próximo passo.',
  },
  empresa: {
    title: 'Sua empresa',
    subtitle: 'Precisamos saber um pouco mais sobre o seu negócio.',
    atividade: {
      label: 'Qual atividade você vai exercer?',
      ph: 'Selecione sua atividade',
      options: ['Comércio', 'Serviços', 'Indústria', 'Tecnologia e TI', 'Saúde', 'Educação', 'Construção civil', 'Consultoria', 'E-commerce', 'Outra'],
    },
    cep: { label: 'CEP do endereço da empresa', help: 'A maioria das prefeituras aceita o uso de endereço residencial.', ph: '00000-000', err: 'Informe um CEP válido.' },
    logradouro: 'Endereço',
    numero: 'Número',
    complemento: 'Complemento',
    bairro: 'Bairro',
    cidade: 'Cidade',
    uf: 'UF',
    situacao: {
      label: 'Qual é a sua situação?',
      options: ['Quero abrir uma nova empresa', 'Já tenho CNPJ e quero contabilidade', 'Quero migrar de contador'],
    },
    panelTitle: 'Sua empresa começa aqui.',
    panelText: 'Com esses dados organizamos a estrutura certa para o seu negócio, no Brasil ou no exterior.',
  },
  documentos: {
    title: 'Documentos',
    subtitle: 'Envie os documentos abaixo. Você poderá reenviá-los depois, na sua área, se precisar corrigir.',
    dropTitle: 'Arraste o arquivo ou clique para enviar',
    dropHint: 'Um arquivo por documento.',
    formats: 'PDF, JPG ou PNG, até 10 MB.',
    required: ['Documento de identidade (RG ou CNH)', 'CPF', 'Comprovante de endereço'],
    pending: 'Pendente',
    sent: 'Enviado',
    replace: 'Substituir',
    panelTitle: 'Tudo em um lugar só.',
    panelText: 'Se algum documento estiver errado, você acessa sua área, corrige e reenvia quando quiser.',
  },
  pagamento: {
    title: 'Pagamento',
    subtitle: 'Escolha a forma de pagamento que faz mais sentido para você.',
    methodLabel: 'Forma de pagamento',
    methods: ['Cartão de crédito', 'PIX', 'Boleto bancário'],
    card: { num: 'Número do cartão', name: 'Nome impresso no cartão', exp: 'Validade', cvv: 'CVV' },
    note: 'Simulação — nada é cobrado nesta versão do site.',
    summaryTitle: 'Sua escolha',
    panelTitle: 'Falta pouco.',
    panelText: 'Revise o plano escolhido e conclua. Depois você poderá acompanhar tudo pela sua área.',
  },
  sucesso: {
    title: 'Solicitação recebida!',
    message: 'Recebemos os seus dados. A equipe LMA vai analisar as informações e entrar em contato com o próximo passo.',
    next: 'Enquanto isso, você já pode acessar a sua área para revisar os dados e reenviar documentos, se precisar.',
    account: 'Acessar minha conta',
  },
  login: {
    title: 'Entrar',
    subtitle: 'Acesse para acompanhar e editar a sua solicitação.',
    email: { label: 'E-mail', ph: 'voce@email.com' },
    senha: { label: 'Senha', ph: 'Sua senha' },
    submit: 'Entrar',
    noAccount: 'Ainda não tem uma solicitação?',
    create: 'Começar agora',
    error: 'E-mail ou senha incorretos.',
  },
  conta: {
    title: 'Minha conta',
    greeting: (name) => `Olá, ${name}`,
    statusLabel: 'Situação',
    statusValue: 'Em análise',
    edit: 'Editar',
    save: 'Salvar',
    cancel: 'Cancelar',
    logout: 'Sair',
    secPessoais: 'Dados pessoais',
    secEmpresa: 'Dados da empresa',
    secDocumentos: 'Documentos',
    secPlano: 'Plano',
    empty: 'Você ainda não tem uma solicitação em andamento.',
    goContratar: 'Conhecer os planos',
  },
};

const en: FormDict = {
  brandAria: 'LMA Contabilidade',
  topTitle: 'Hire a plan',
  stepOf: (c, t) => `${c}/${t}`,
  back: 'Back',
  next: 'Continue',
  finish: 'Finish',
  langLabel: 'Language',
  required: 'Required field.',
  planLabel: 'Selected plan',
  consulta: 'On request',
  stepNames: { pessoais: 'Personal data', empresa: 'Company data', documentos: 'Documents', pagamento: 'Payment' },
  pessoais: {
    title: 'Personal data',
    subtitle: 'To continue, we need to know a little more about you.',
    nome: { label: 'Full name', ph: 'Your first and last name', err: 'Enter your first and last name.' },
    email: { label: 'E-mail', ph: 'you@email.com', err: 'Enter a valid e-mail.' },
    celular: { label: 'Mobile', ph: '+55 11 90000-0000', err: 'Enter your mobile number.' },
    senha: { label: 'Create password', help: 'You will use this e-mail and password to track and edit your request.', err: 'The password must be at least 6 characters.' },
    senha2: { label: 'Confirm password', err: 'The passwords do not match.' },
    panelTitle: 'Welcome!',
    panelText: 'Your request starts here. We will gather your details so the LMA team can prepare the next step.',
  },
  empresa: {
    title: 'Your company',
    subtitle: 'We need to know a little more about your business.',
    atividade: {
      label: 'Which activity will you carry out?',
      ph: 'Select your activity',
      options: ['Retail', 'Services', 'Industry', 'Technology & IT', 'Healthcare', 'Education', 'Construction', 'Consulting', 'E-commerce', 'Other'],
    },
    cep: { label: 'Company address postal code', help: 'Most city halls accept the use of a residential address.', ph: '00000-000', err: 'Enter a valid postal code.' },
    logradouro: 'Address',
    numero: 'Number',
    complemento: 'Complement',
    bairro: 'District',
    cidade: 'City',
    uf: 'State',
    situacao: {
      label: 'What is your situation?',
      options: ['I want to open a new company', 'I already have a company and want accounting', 'I want to switch accountant'],
    },
    panelTitle: 'Your company starts here.',
    panelText: 'With this information we set up the right structure for your business, in Brazil or abroad.',
  },
  documentos: {
    title: 'Documents',
    subtitle: 'Upload the documents below. You can re-upload them later in your area if you need to fix anything.',
    dropTitle: 'Drag the file or click to upload',
    dropHint: 'One file per document.',
    formats: 'PDF, JPG or PNG, up to 10 MB.',
    required: ['ID document (passport or national ID)', 'Tax ID', 'Proof of address'],
    pending: 'Pending',
    sent: 'Uploaded',
    replace: 'Replace',
    panelTitle: 'Everything in one place.',
    panelText: 'If a document is wrong, you access your area, fix it and re-upload whenever you want.',
  },
  pagamento: {
    title: 'Payment',
    subtitle: 'Choose the payment method that makes the most sense for you.',
    methodLabel: 'Payment method',
    methods: ['Credit card', 'PIX', 'Bank slip'],
    card: { num: 'Card number', name: 'Name on card', exp: 'Expiry', cvv: 'CVV' },
    note: 'Simulation — nothing is charged in this version of the site.',
    summaryTitle: 'Your choice',
    panelTitle: 'Almost there.',
    panelText: 'Review the chosen plan and finish. You will then be able to follow everything in your area.',
  },
  sucesso: {
    title: 'Request received!',
    message: 'We received your details. The LMA team will review the information and reach out with the next step.',
    next: 'In the meantime, you can access your area to review the data and re-upload documents if needed.',
    account: 'Go to my account',
  },
  login: {
    title: 'Sign in',
    subtitle: 'Sign in to track and edit your request.',
    email: { label: 'E-mail', ph: 'you@email.com' },
    senha: { label: 'Password', ph: 'Your password' },
    submit: 'Sign in',
    noAccount: "Don't have a request yet?",
    create: 'Start now',
    error: 'Incorrect e-mail or password.',
  },
  conta: {
    title: 'My account',
    greeting: (name) => `Hello, ${name}`,
    statusLabel: 'Status',
    statusValue: 'Under review',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    logout: 'Sign out',
    secPessoais: 'Personal data',
    secEmpresa: 'Company data',
    secDocumentos: 'Documents',
    secPlano: 'Plan',
    empty: 'You do not have a request in progress yet.',
    goContratar: 'See the plans',
  },
};

const ar: FormDict = {
  brandAria: 'LMA Contabilidade',
  topTitle: 'اشترك في خطة',
  stepOf: (c, t) => `${c}/${t}`,
  back: 'رجوع',
  next: 'متابعة',
  finish: 'إنهاء',
  langLabel: 'اللغة',
  required: 'حقل مطلوب.',
  planLabel: 'الخطة المختارة',
  consulta: 'عند الطلب',
  stepNames: { pessoais: 'البيانات الشخصية', empresa: 'بيانات الشركة', documentos: 'المستندات', pagamento: 'الدفع' },
  pessoais: {
    title: 'البيانات الشخصية',
    subtitle: 'للمتابعة، نحتاج إلى معرفة المزيد عنك.',
    nome: { label: 'الاسم الكامل', ph: 'اسمك الأول والأخير', err: 'أدخل اسمك الأول والأخير.' },
    email: { label: 'البريد الإلكتروني', ph: 'you@email.com', err: 'أدخل بريدًا إلكترونيًا صحيحًا.' },
    celular: { label: 'رقم الجوال', ph: '+55 11 90000-0000', err: 'أدخل رقم جوالك.' },
    senha: { label: 'إنشاء كلمة مرور', help: 'ستستخدم هذا البريد وكلمة المرور لمتابعة طلبك وتعديله.', err: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.' },
    senha2: { label: 'تأكيد كلمة المرور', err: 'كلمتا المرور غير متطابقتين.' },
    panelTitle: 'أهلًا بك!',
    panelText: 'يبدأ طلبك من هنا. سنجمع بياناتك ليحضّر فريق LMA الخطوة التالية.',
  },
  empresa: {
    title: 'شركتك',
    subtitle: 'نحتاج إلى معرفة المزيد عن نشاطك.',
    atividade: {
      label: 'ما النشاط الذي ستمارسه؟',
      ph: 'اختر نشاطك',
      options: ['تجارة', 'خدمات', 'صناعة', 'تقنية ومعلومات', 'صحة', 'تعليم', 'بناء وتشييد', 'استشارات', 'تجارة إلكترونية', 'أخرى'],
    },
    cep: { label: 'الرمز البريدي لعنوان الشركة', help: 'معظم البلديات تقبل استخدام عنوان سكني.', ph: '00000-000', err: 'أدخل رمزًا بريديًا صحيحًا.' },
    logradouro: 'العنوان',
    numero: 'الرقم',
    complemento: 'تفاصيل إضافية',
    bairro: 'الحي',
    cidade: 'المدينة',
    uf: 'الولاية',
    situacao: {
      label: 'ما هو وضعك؟',
      options: ['أريد تأسيس شركة جديدة', 'لدي شركة وأريد المحاسبة', 'أريد تغيير المحاسب'],
    },
    panelTitle: 'شركتك تبدأ هنا.',
    panelText: 'بهذه البيانات نُنشئ الهيكل المناسب لعملك، في البرازيل أو في الخارج.',
  },
  documentos: {
    title: 'المستندات',
    subtitle: 'ارفع المستندات أدناه. يمكنك إعادة رفعها لاحقًا من منطقتك إذا احتجت إلى التصحيح.',
    dropTitle: 'اسحب الملف أو انقر للرفع',
    dropHint: 'ملف واحد لكل مستند.',
    formats: 'PDF أو JPG أو PNG، حتى 10 ميغابايت.',
    required: ['وثيقة هوية (جواز سفر أو هوية وطنية)', 'الرقم الضريبي', 'إثبات العنوان'],
    pending: 'قيد الانتظار',
    sent: 'تم الرفع',
    replace: 'استبدال',
    panelTitle: 'كل شيء في مكان واحد.',
    panelText: 'إذا كان هناك مستند خاطئ، تدخل منطقتك وتصححه وتعيد رفعه متى شئت.',
  },
  pagamento: {
    title: 'الدفع',
    subtitle: 'اختر طريقة الدفع الأنسب لك.',
    methodLabel: 'طريقة الدفع',
    methods: ['بطاقة ائتمان', 'PIX', 'إيصال بنكي'],
    card: { num: 'رقم البطاقة', name: 'الاسم على البطاقة', exp: 'تاريخ الانتهاء', cvv: 'CVV' },
    note: 'محاكاة — لا يُحصَّل أي مبلغ في هذه النسخة من الموقع.',
    summaryTitle: 'اختيارك',
    panelTitle: 'بقي القليل.',
    panelText: 'راجع الخطة المختارة وأنهِ. بعدها يمكنك متابعة كل شيء من منطقتك.',
  },
  sucesso: {
    title: 'تم استلام الطلب!',
    message: 'استلمنا بياناتك. سيراجع فريق LMA المعلومات ويتواصل معك بالخطوة التالية.',
    next: 'في هذه الأثناء، يمكنك الدخول إلى منطقتك لمراجعة البيانات وإعادة رفع المستندات عند الحاجة.',
    account: 'الذهاب إلى حسابي',
  },
  login: {
    title: 'تسجيل الدخول',
    subtitle: 'سجّل الدخول لمتابعة طلبك وتعديله.',
    email: { label: 'البريد الإلكتروني', ph: 'you@email.com' },
    senha: { label: 'كلمة المرور', ph: 'كلمة المرور' },
    submit: 'دخول',
    noAccount: 'ليس لديك طلب بعد؟',
    create: 'ابدأ الآن',
    error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.',
  },
  conta: {
    title: 'حسابي',
    greeting: (name) => `مرحبًا، ${name}`,
    statusLabel: 'الحالة',
    statusValue: 'قيد المراجعة',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    logout: 'خروج',
    secPessoais: 'البيانات الشخصية',
    secEmpresa: 'بيانات الشركة',
    secDocumentos: 'المستندات',
    secPlano: 'الخطة',
    empty: 'ليس لديك طلب قيد التنفيذ بعد.',
    goContratar: 'تعرّف على الخطط',
  },
};

const forms: Record<Locale, FormDict> = { pt, en, ar };
export const getFormDict = (locale: Locale) => forms[locale];
