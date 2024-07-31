import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      features: "Features",
      upgradeToPro: "Upgrade to Pro",
      designYourDreamHome: "Design Your Dream Home",
      heroDescription:
        "Turn your ideas into professional interior designs with our easy-to-use AI software",
      tryFreeDemo: "Try Free Demo",
      seePrices: "See Prices",
      uploadPhotoTitle: "Upload a photo of your room",
      uploadPhotoSubtitle: "We'll redesign it with AI",
      tipDaylight: "Take a picture in daylight",
      tipHideItems: "Hide non-essential items",
      tipUseLens: "Use the regular 1x lens",
      browsePhotos: "Browse photos",
      generateDesignIdeas: "Generate design ideas",
      registerToSeeResults: "Register to see your results",
      chooseRegistrationMethod: "Choose a registration method to continue",
      continueWithGoogle: "Continue with Google",
      or: "or",
      enterYourEmail: "Enter your email",
      register: "Register",
      feature1Title: "Beautiful Redesign and Stunning Transformations",
      feature1Description:
        "Want to make your home look stunning inside and out? Our Beautiful Redesign interior ai feature can do just that. It helps you change up your place in different styles, making it look amazing. Redesign any type of interior, exteriors or gardens.",
      feature2Title: "Creative Redesign for Interiors and Exteriors",
      feature2Description:
        "Give the AI the freedom to be artistic with Creative Redesign. It can make more exciting changes to your house or interiors, creating a one-of-a-kind design that really stands out. Let AI rearrange furniture or redesign your house and give it a different perspective.",
      feature3Title: "Fill The Room with Furniture and Decorations",
      feature3Description:
        "Ever wondered how your place would look with the furniture you want? Fill The Room lets the AI furnish any room type. You can try out different setups until you find the perfect one. Decorate empty room with furniture with HomeDesignsAI. Works for under construction or empty spaces.",
      feature4Title: "Decor Staging and Furniture Showcase",
      feature4Description:
        "Show off your furniture and decor in lots of styles with Decor Staging. You can see how your stuff would look in all kinds of different designs, like a pro decorator. Showcase any piece of furniture or other objects.",
      beginFreeTrial: "Begin your free trial",
      trialDescription:
        "To begin your free 7-day trial, we request your credit card details. It is a simple way for us to verify that you are a genuine person and helps maintain the quality of our service for all. Feel free to cancel at any time during the trial without charges.",
      startFreeTrial: "Start Free Trial",
      resultImage: "Result Image",
      heroTitle: "All you need is a plan",
      heroSubtitle: "Create your own interior design",
      startFree: "Start free",
      upload: "Upload",
      camera: "Camera",
      lidar: "Lidar",
      createPlan: "Create Plan",
      designStyleTitle: "What's your design style?",
      designStyleSubtitle: "Choose one style that best fits your preferences",
      continueWithStyle: "Continue with this style",
      uploadTitle: "Upload a photo of your room",
      uploadSubtitle: "We'll redesign it with AI",
      uploadRule1: "✓ Take a picture in daylight",
      uploadRule2: "✓ Hide non-essential items",
      uploadRule3: "✓ Use the regular 1x lens",
      uploadButton: "Continue",
      photoGuide: "Photo guide",
      openCamera: "Open camera",
      takeAPhoto: "Take a photo",
    },
  },
  ru: {
    translation: {
      login: "Войти",
      features: "Возможности",
      upgradeToPro: "Обновить до Pro",
      designYourDreamHome: "Создайте дом своей мечты",
      heroDescription:
        "Превратите свои идеи в профессиональный дизайн интерьера с помощью нашего простого в использовании ИИ-софта",
      tryFreeDemo: "Попробовать бесплатно",
      seePrices: "Посмотреть цены",
      uploadPhotoTitle: "Загрузите фото вашей комнаты",
      uploadPhotoSubtitle: "Мы переделаем ее с помощью ИИ",
      tipDaylight: "Сделайте фото при дневном свете",
      tipHideItems: "Уберите лишние предметы",
      tipUseLens: "Используйте обычный объектив 1x",
      browsePhotos: "Выбрать фото",
      generateDesignIdeas: "Сгенерировать идеи дизайна",
      registerToSeeResults: "Зарегистрируйтесь, чтобы увидеть результаты",
      chooseRegistrationMethod: "Выберите метод регистрации, чтобы продолжить",
      continueWithGoogle: "Продолжить с Google",
      or: "или",
      enterYourEmail: "Введите ваш email",
      register: "Зарегистрироваться",
      feature1Title: "Прекрасный редизайн и потрясающие преобразования",
      feature1Description:
        "Хотите сделать свой дом потрясающим изнутри и снаружи? Наша функция Beautiful Redesign interior ai может сделать именно это. Она помогает изменить ваше пространство в разных стилях, делая его удивительным. Редизайн любых типов интерьера, экстерьера или садов.",
      feature2Title: "Креативный редизайн интерьеров и экстерьеров",
      feature2Description:
        "Дайте ИИ свободу быть творческим с Creative Redesign. Он может внести более захватывающие изменения в ваш дом или интерьер, создавая уникальный дизайн, который действительно выделяется. Позвольте ИИ переставить мебель или переделать ваш дом и придать ему другую перспективу.",
      feature3Title: "Наполните комнату мебелью и декором",
      feature3Description:
        "Когда-нибудь задумывались, как бы выглядело ваше место с желаемой мебелью? Fill The Room позволяет ИИ обставить любой тип комнаты. Вы можете попробовать разные варианты, пока не найдете идеальный. Украсьте пустую комнату мебелью с HomeDesignsAI. Работает для строящихся или пустых пространств.",
      feature4Title: "Постановка декора и выставка мебели",
      feature4Description:
        "Продемонстрируйте свою мебель и декор во многих стилях с Decor Staging. Вы можете увидеть, как ваши вещи будут выглядеть во всевозможных разных дизайнах, как профессиональный декоратор. Демонстрируйте любую мебель или другие предметы.",
    },
    beginFreeTrial: "Начните бесплатный пробный период",
    trialDescription:
      "Чтобы начать 7-дневный бесплатный пробный период, мы просим вас указать данные кредитной карты. Это простой способ для нас убедиться, что вы реальный человек, и помогает поддерживать качество нашего сервиса для всех. Вы можете отменить в любое время в течение пробного периода без каких-либо charges.",
    startFreeTrial: "Начать бесплатный период",
    resultImage: "Результат",
    heroTitle: "Все, что вам нужно - это план",
    heroSubtitle: "Создайте свой собственный дизайн интерьера",
    startFree: "Попробовать бесплатно",
    upload: "Загрузить",
    camera: "Камера",
    lidar: "Лидар",
    createPlan: "Создать план",
    designStyleTitle: "Какой ваш стиль дизайна?",
    designStyleSubtitle:
      "Выберите один стиль, который лучше всего соответствует вашим предпочтениям",
    continueWithStyle: "Продолжить с этим стилем",
    uploadTitle: "Загрузите фото своей комнаты",
    uploadSubtitle: "Мы переделаем его с помощью ИИ",
    uploadRule1: "✓ Сфотографируйте при дневном свете",
    uploadRule2: "✓ Скрыть несущественные предметы",
    uploadRule3: "✓ Используйте обычный объектив 1x",
    browsePhotos: "Выберите фото",
    uploadButton: "Продолжить",
    photoGuide: "Советы по фото",
    openCamera: "Открыть камеру",
    takeAPhoto: "Сделать фото",
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
