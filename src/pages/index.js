'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import StepRenderer from '../components/form/stepRenderer';
import fbEvent from '../services/fbEvents';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { info } from '../../info';

import logo from '../../public/logo.png';
import i02 from '../../public/survey/02.png';
import i03 from '../../public/survey/03.png';

const Intro = () => <motion.div
  key="intro"
  initial={{opacity: 0}}
  animate={{opacity: 1}}
  exit={{opacity: 0}}
  transition={{duration: 0.5}}
  className="bg-[url('/survey/00.jpg')] bg-center bg-cover relative flex-grow flex flex-col items-center justify-end px-4 py-12"
>
  <div className="absolute mx-auto inset-x-0 w-[32rem] h-[10rem] top-[4rem]">
    <Image src={logo} layout="fill" className="object-contain"/>
  </div>

  <div className="absolute bg-gradient-to-t from-brand-1 to-transparent bottom-0 h-[60dvh] w-full "/>

  <div className="container flex flex-col justify-center items-center z-10">
    <h1 className="ft-11 text-white font-semibold my-12 text-center">Diseñamos espacios comerciales que venden</h1>
    <p className="ft-4 font-medium text-white text-center">Cuéntanos sobre tu negocio y te enviaremos una propuesta en
      menos de 24 horas</p>

    <div className="w-full max-w-[50rem] h-12 p-2 mt-16 mb-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{width: '0%'}}
        animate={{width: '100%'}}
        transition={{duration: 6, ease: 'easeInOut'}}
        className="h-full bg-gradient-to-br from-blue-800 to-indigo-500 rounded-2xl"
      />
    </div>
    <p className="-ft-1 flex items-center text-center text-gray-100">
      Cargando el test
      <span
        className="-ft-1 material-symbols-outlined animate-spin ml-4">progress_activity</span>
    </p>
  </div>
</motion.div>;

const setFormSteps = ({fullName, phone}) => ([
  {
    type: 'text',
    name: 'giro',
    title: '¿De qué es el negocio que buscas remodelar, decorar o poner?',
    inputOptions: {required: 'Cuéntanos el giro del negocio'},
    cols: 1,
  },
  {
    type: 'radio',
    name: 'ubicacion',
    title: '¿Dónde está ubicado?',
    inputOptions: {required: 'Selecciona una ubicación'},
    options: [
      {value: 'guadalajara', label: 'Guadalajara'},
      {value: 'zapopan', label: 'Zapopan'},
      {value: 'tonala', label: 'Tonalá'},
      {value: 'tlaquepaque', label: 'Tlaquepaque'},
      {value: 'otro', label: 'Otro'},
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-1',
    autoAdvance: false,
    render: () => (
      <div className={`relative flex-grow`}><p className="ft-6 sans text-center font-bold">No solo hacemos negocios
        bonitos: hacemos negocios rentables</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i02} layout="fill" objectFit="cover"/>
        </div>
        <div className="gap-8 grid grid-cols-1">
          <div className="p-8 rounded-xl bg-neutral-800 border-4 border-brand-2 shadow-md">
            <p className="font-semibold ft-3 text-neutral-50 text-center mb-4">Tu proyecto en tiempo récord</p>
            <p className="ft-2 font-medium text-neutral-50 text-center">Diseños en máximo 7 días, ejecución supervisada
              y entregas puntuales</p>
          </div>
          <div className="p-8 rounded-xl bg-neutral-800 border-4 border-brand-2 shadow-md">
            <p className="font-semibold ft-3 text-neutral-50 text-center mb-4">Arquitectura con visión comercial</p>
            <p className="ft-2 font-medium text-neutral-50 text-center">Analizamos cada proyecto para dar a los usuarios
              una experiencia agradable en tu negocio</p>
          </div>
          <div className="p-8 rounded-xl bg-neutral-800 border-4 border-brand-2 shadow-md">
            <p className="font-semibold ft-3 text-neutral-50 text-center mb-4">Servicio integral llave en mano</p>
            <p className="ft-2 font-medium text-neutral-50 text-center">Nosotros diseñamos, construimos y entregamos el
              espacio listo para operar</p>
          </div>

        </div>
      </div>),
  },
  {
    type: 'radio',
    name: 'metros',
    title: '¿Sabes aprox. los m² del espacio?',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'menor-60', label: 'Menor de 60 m²'},
      {value: '60-100', label: 'Mayor de 60 a 100 m²'},
      {value: 'mayor-150', label: 'Mayor de 150 m²'},
      {value: 'otro', label: 'Otro'},
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'alcance',
    title: '¿Buscas diseño y construcción del mismo proyecto?',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'solo-diseno', label: 'Solo diseño'},
      {value: 'diseno-y-construccion', label: 'Diseño y construcción'},
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'presupuesto',
    title: '¿Tienes ya un presupuesto?',
    inputOptions: {required: 'Selecciona una opción'},
    options: [
      {value: 'si', label: 'Sí'},
      {value: 'no', label: 'No'},
      {value: 'cotizar', label: 'Quiero cotizar con ustedes'},
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-2',
    render: () => (
      <div className={`relative flex-grow`}><p className="ft-6 sans text-center font-bold">
        Algunos clientes que ya confiaron en nosotros
      </p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i03} layout="fill" objectFit="cover"/>
        </div>
        <div className="relative grid grid-cols-3 gap-16 grayscale">
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/01.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/02.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/03.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/04.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/05.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/06.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/07.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/08.png" layout="fill" objectFit="contain"/>
          </div>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image src="/survey/clients/09.png" layout="fill" objectFit="contain"/>
          </div>
        </div>
      </div>),
  },
  {
    type: 'opt-in',
    title: '¡Listo! Déjanos tus datos para continuar con tu cotización',
    description: 'Con tu información podremos contactarte y enviarte una propuesta.',
    fields: [
      {
        type: 'text',
        name: 'fullName',
        title: 'Tu nombre completo',
        inputOptions: {value: fullName, required: '¿Cómo te llamas?'},
      },
      {
        type: 'text',
        name: 'email',
        title: 'Un correo',
        inputOptions: {required: 'Regálanos un correo'},
      },
      {
        type: 'tel',
        name: 'phone',
        title: 'Tu WhatsApp',
        inputOptions: {
          value: phone,
          required: '¿Cuál es tu WhatsApp?',
          maxLength: {value: 10, message: 'Tu tel a 10 dígitos'},
          minLength: {value: 10, message: 'Tu tel a 10 dígitos'},
        },
      },
    ],
  },
]);


export default function Survey({lead, utm}) {
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);

  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = methods;
  const router = useRouter();

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [showIntro]);

  useEffect(() => {
    const current = formSteps[formStep];

    if (current.autoAdvance) {
      const timer = setTimeout(() => {
        setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formStep]);
  useEffect(() => {
    const step = formSteps[formStep];

    if (step?.type === 'checkpoint') {
      fbEvent(step?.name);
      console.log(step?.name);
    }
  }, [formStep]);

  let formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone});

  const lastInputIndex = formSteps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);
  const handleNext = async () => {
    const currentStep = formSteps[formStep];

    if (currentStep.name === 'user') {
      formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone, user: watch('user')});
    }

    if (currentStep.type === 'checkpoint') {
      return setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }

    const valid = await methods.trigger(currentStep.name);
    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);
    setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };
  const onSubmit = async (data) => {
    setSending(true);
    try {
      data.whatsapp = '521' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');

      const payload = {...lead, ...data, ...utm};

      const url = info.surveyWebhook;

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fbEvent(
        'Lead',
        {phone: data.phone, externalID: res.id},
      );

      setCookie('lead', {...data, id: res.id});

      await router.push('/thankyou');

    } catch (err) {
      console.error('Error al enviar formulario:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro/>
          )}
          {!showIntro && !showOutro && (
            <motion.div
              key="survey"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.5}}
              className="flex flex-col flex-grow pb-[8rem]"
            >
              <div className="sticky top-0 bg-white mx-auto w-full max-w-[56rem] p-8 z-10">
                <div className="relative bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
                </div>
              </div>
              <div
                className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
                <div className="survey-card">
                  <FormProvider {...methods}>
                    <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={formStep} // importante para animaciones entre pasos
                          initial={{opacity: 0, x: 100}}
                          animate={{opacity: 1, x: 0}}
                          exit={{opacity: 0, x: -100}}
                          transition={{duration: 0.4, ease: 'easeInOut'}}
                        >
                          <StepRenderer
                            step={formSteps[formStep]}
                            index={formStep}
                            currentStep={formStep}
                            errors={errors}
                            inputError={inputError}
                            errorMessage={errors[formSteps[formStep]?.name]?.message}
                            register={register}
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div
                        className={`fixed p-8 bottom-0 inset-x-0 grid ${formSteps[formStep].type === 'checkpoint' ? 'grid-cols-1' : 'grid-cols-2'} gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                        {formSteps[formStep].type !== 'checkpoint' &&
                          <button
                            type="button"
                            onClick={() => setFormStep(formStep - 1)}
                            className="!bg-transparent !text-brand-1 border-none !w-full hover:text-brand-1 disabled:!text-gray-100"
                            disabled={formStep <= 0}
                          >Atrás
                          </button>
                        }
                        <button
                          type="button"
                          disabled={sending}
                          onClick={() => {
                            if (formStep === lastInputIndex) {
                              handleSubmit(onSubmit)();
                            } else {
                              handleNext();
                            }
                          }}
                          className="mt-auto !w-full"
                        >
                          {sending && <span className="animate-spin mr-4">+</span>}
                          {formStep === lastInputIndex ? 'Continuar' : 'Siguiente'}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const {req} = ctx;
  const cookiesHeader = req.headers.cookie || '';

  const keys = ['utm', '_fbc', '_fbp', 'lead'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];

    if (!raw) continue;

    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  const {lead, utm} = cookies;

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone: lead?.phone ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm: utm ?? null,
    },
  };
}
