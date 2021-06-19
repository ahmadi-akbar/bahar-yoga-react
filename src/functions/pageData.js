import store from './store';
import {
  addToDataArray,
  buy,
  contactBoy,
  createOrder,
  savePost,
  sendExtra,
  sendSms,
  pushArrayToDataArray,
} from './index';
import { toast } from 'react-toastify';

var pageData = {
  estekhdam: {
    add: {
      data: {},
      fields: [
        // {
        //   type: "title",
        //   size: {
        //     sm: 6,
        //     lg: 12
        //   },
        //   title: "basic information",
        // },
        {
          type: 'input',
          label: 'نام',
          size: {
            sm: 6,
            lg: 6,
          },

          onChange: (text) => {
            pageData.estekhdam.add.data['firstName'] = text;
          },
          placeholder: 'نام',
          child: [],
        },
        {
          type: 'input',
          label: 'نام خانوادگی',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.estekhdam.add.data['lastName'] = text;
          },
          placeholder: 'نام خانوادگی',
          child: [],
        },
        {
          type: 'email',
          label: 'ایمیل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.estekhdam.add.data['email'] = text;
          },
          placeholder: 'ایمیل (اختیاری)',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره موبایل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.estekhdam.add.data['phoneNumber'] = text;
          },
          className: 'ltr',
          placeholder: '0912*******',
          child: [],
        },
        {
          type: 'input',
          label: 'سن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.estekhdam.add.data['age'] = text;
          },

          placeholder: '۲۷ سال',
          child: [],
        },

        {
          type: 'selectOption',
          label: 'جنسیت',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (Gender) => {
            pageData.estekhdam.add.data['sex'] = Gender;
          },
          placeholder: 'جنسیت',
          selectOptionText: 'انتخاب جنسیت',
          children: [
            {
              value: 'male',
              name: 'مرد',
            },
            {
              value: 'female',
              name: 'زن',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'سابقه کار',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (sabegheKar) => {
            pageData.estekhdam.add.data['sabegheKar'] = sabegheKar;
          },
          placeholder: 'سابقه کار',
          selectOptionText: 'انتخاب مدت سابقه کار',
          children: [
            {
              value: '1',
              name: 'زیر ۱ سال',
            },
            {
              value: '2',
              name: 'بین ۱ الی ۳ سال',
            },
            {
              value: '3',
              name: 'بین ۳ الی ۸ سال',
            },
            {
              value: '4',
              name: 'بالای ۸ سال',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'سابقه تحصیل',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (tahsilat) => {
            pageData.estekhdam.add.data['tahsilat'] = tahsilat;
          },
          placeholder: 'تحصیلات',
          selectOptionText: 'انتخاب میزان تحصیلات',
          children: [
            {
              value: '1',
              name: 'زیر دیپلم',
            },
            {
              value: '2',
              name: 'دیپلم',
            },
            {
              value: '3',
              name: 'لیسانس',
            },
            {
              value: '4',
              name: 'فوق لیسانس',
            },
            {
              value: '5',
              name: 'دکتری',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'وضعیت',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (Stu) => {
            pageData.estekhdam.add.data['Stu'] = Stu;
          },
          placeholder: 'وضعیت دانشجویی',
          selectOptionText: 'انتخاب وضعیت',
          children: [
            {
              value: 'student',
              name: 'دانشجو هستم',
            },
            {
              value: 'no',
              name: 'دانشجو نیستم',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'وضعیت تاهل',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (Stu) => {
            pageData.estekhdam.add.data['taahol'] = Stu;
          },
          placeholder: 'وضعیت تاهل',
          selectOptionText: 'انتخاب وضعیت',
          children: [
            {
              value: 'single',
              name: 'مجرد هستم',
            },
            {
              value: 'couple',
              name: 'متاهل هستم',
            },
            {
              value: 'motareke',
              name: 'متارکه',
            },
          ],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            savePost({ lastname: text });
            console.log(text);
          },
          className: 'height50',
          placeholder: 'ایمیل (اختیاری)',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: ['title', 'text'],
          url: '/customer/d',
          name: 'ذخیره اطلاعات',
          size: {
            sm: 12,
            lg: 6,
          },
          onClick: async (e) => {
            console.log('this.data', pageData.estekhdam.add.data);
            let {
              firstName,
              lastName,
              phoneNumber,
              sex,
            } = pageData.estekhdam.add.data;
            let err = '';
            if (!firstName) err = 'نام خود را وارد کنید';
            if (!lastName) err = 'نام خانوادگی خود را وارد کنید';
            if (!phoneNumber) err = 'شماره تماس خود را وارد کنید';
            if (!sex) err = 'جنسیت خود را وارد کنید';
            if (err) return toast.error(err);

            sendExtra('estekhdam', pageData.estekhdam.add.data).then((res) => {
              console.log('res for addDriver is:', res);
              toast.success(
                'درخواست شما ثبت شد و در اسرع وقت بررسی و با شما تماس گرفته می شود!'
              );
            });
          },
        },
      ],
    },
  },
  submitOrder: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'نام',
          size: {
            sm: 12,
            lg: 12,
          },

          onChange: (text) => {
            pageData.submitOrder.add.data['firstName'] = text;
            pageData.submitOrder.add.fields[0]['value'] = text;
          },
          placeholder: 'نام',
          child: [],
          // value:''
          value: store.getState().store.firstName || '',
        },
        {
          type: 'input',
          label: 'نام خانوادگی',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.submitOrder.add.data['lastName'] = text;
          },
          placeholder: 'نام خانوادگی',
          child: [],
          value: store.getState().store.lastName || '',
          // value:''
        },
        {
          type: 'email',
          label: 'ایمیل',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.submitOrder.add.data['email'] = text;
          },
          placeholder: 'ایمیل (اختیاری)',
          child: [],
          // value:''
          value: store.getState().store.email || '',
        },
        {
          type: 'input',
          label: 'شماره موبایل',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.submitOrder.add.data['phoneNumber'] = text;
          },
          className: 'ltr',
          placeholder: '0912*******',
          child: [],
          value: store.getState().store.phoneNumber || '',
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          className: 'height50',
          placeholder: '',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: ['title', 'text'],
          url: '/order/',
          name: 'submit order and pay',
          className: 'ml-auto ffgg btn btn-accent btn-lg',
          size: {
            sm: 12,
            lg: 12,
          },
          onClick: async (e) => {
            console.log('this.data', pageData.submitOrder.add.data);
            let {
              firstName,
              lastName,
              phoneNumber,
              email,
            } = pageData.submitOrder.add.data;
            let { card, agent, link } = store.getState().store;
            let err = '';
            if (!firstName) err = 'نام خود را وارد کنید';

            if (!lastName) err = 'نام خانوادگی خود را وارد کنید';
            if (!phoneNumber) err = 'شماره تماس خود را وارد کنید';
            if (err) return toast.error(err);

            let s = 0;
            card.map((c, i) => {
              s += c.price;
              return;
            });
            createOrder({
              sum: s,
              customer_data: {
                firstName,
                lastName,
                phoneNumber,
                email,
              },
              card: card,
              agent: agent,
              link: link,
            }).then((res) => {
              console.log('res for judytgs is:', res.order._id);
              buy(res.order._id).then((add) => {
                console.log('ass', add);
                window.location.replace(add.url);
              });
            });
          },
        },
      ],
    },
  },
  sendSms: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'شماره موبایل',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.sendSms.add.data['phoneNumber'] = text;
          },
          className: 'ltr',
          placeholder: '0912*******',
          child: [],
          // value: pageData.sendSms.add.data['phoneNumber'] || ""
        },
        {
          type: 'textarea',
          label: 'متن اس ام اس',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.sendSms.add.data['message'] = text;
          },
          className: 'ltr',
          placeholder: 'متن پیام',
          child: [],
          // value: pageData.sendSms.add.data['message'] || ""
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          className: 'height50',
          placeholder: '',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: ['title', 'text'],
          url: '/order/',
          name: 'Send sms',
          className: 'ml-auto ffgg btn btn-accent btn-lg',
          size: {
            sm: 12,
            lg: 12,
          },
          onClick: async (e) => {
            console.log('this.data', pageData.sendSms.add.data);
            let { phoneNumber, message } = pageData.sendSms.add.data;

            let err = '';
            if (!message) err = 'پیام خود را وارد کنید';

            if (!phoneNumber) err = 'شماره موبایل خود را وارد کنید';
            if (err) return toast.error(err);

            sendSms({
              phoneNumber,
              message,
            }).then((res) => {
              if (res.success) {
                toast.success('اس ام اس شما ارسال شد');
                pageData.sendSms.add.fields[1].value = '';
              } else toast.error('اس ام اس شما ارسال نشد');
            });
          },
        },
      ],
    },
  },
  wallet: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'Voucher number',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.sendSms.add.data['vn'] = text;
          },
          className: 'ltr',
          placeholder: '',
          child: [],
          // value: pageData.sendSms.add.data['phoneNumber'] || ""
        },
        {
          type: 'input',
          label: 'Voucher code',

          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            pageData.sendSms.add.data['vc'] = text;
          },
          className: 'ltr',
          placeholder: '',
          child: [],
          // value: pageData.sendSms.add.data['message'] || ""
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          className: 'height50',
          placeholder: '',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: ['title', 'text'],
          url: '/#c/',
          name: 'CONFIRM',
          className: 'ml-auto ffgg btn btn-accent btn-lg',
          size: {
            sm: 12,
            lg: 12,
          },
          onClick: async (e) => {
          },
        },
      ],
    },
  },

  x5f3d37dc29d5ff48996ce466: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'کشور',

          size: {
            sm: 12,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کشور',
              value: d,
            }).then(() => {});
          },
          placeholder: 'کشور',
          selectOptionText: 'انتخاب کشور برای تحصیل',
          children: [
            {
              value: 'افغانستان',
              name: 'افغانستان',
            },
            {
              value: 'ایران',
              name: 'ایران',
            },
            {
              value: 'ترکیه',
              name: 'ترکیه',
            },
            {
              value: 'تاجیکستان',
              name: 'تاجیکستان',
            },
            {
              value: 'قبرس شمالی',
              name: 'قبرس شمالی',
            },
            {
              value: 'هندوستان',
              name: 'هندوستان',
            },
            {
              value: 'ازبکستان',
              name: 'ازبکستان',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'معرفی',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'معرفی',
              value: d,
            }).then(() => {});
          },
          placeholder: 'معرفی',
          selectOptionText: 'انتخاب نوع هویت',
          children: [
            {
              value: 'شرکت هستم',
              name: 'شرکت هستم',
            },
            {
              value: 'پوهنتون هستم',
              name: 'پوهنتون هستم',
            },
            {
              value: 'مرکز آموزشی هستم',
              name: 'مرکز آموزشی هستم',
            },
          ],
        },
        {
          type: 'input',
          label: 'نام پوهنتون / شرکت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام پوهنتون / شرکت',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'رشته های تحصیلی',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'رشته های تحصیلی',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'checkbox',
          label: 'مقاطع',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            console.log('d', d);
            pushArrayToDataArray({
              name: 'مقاطع',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
          placeholder: 'مقاطع',
          selectOptionText: 'انتخاب مقاطع برای تحصیل',
          children: [
            {
              value: 'بکلوریا',
              name: 'بکلوریا',
            },
            {
              value: 'انستیتیوت',
              name: 'انستیتیوت',
            },
            {
              value: 'لیسانس',
              name: 'لیسانس',
            },
            {
              value: 'ماستر',
              name: 'ماستر',
            },
            {
              value: 'دوکتورا',
              name: 'دوکتورا',
            },
            {
              value: 'ترانسفرکردیت',
              name: 'ترانسفرکردیت',
            },
          ],
        },
        {
          type: 'input',
          label: 'شرایط تحصیل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شرایط تحصیل',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'لیلیه و شرایط آن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'لیلیه و شرایط آن',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          //  placeholder: "دارد / ندارد",
          child: [],
        },
        {
          type: 'input',
          label: 'ویزه و شرایط آن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ویزه و شرایط آن',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          //  placeholder: "دارد / ندارد",
          child: [],
        },
        {
          type: 'input',
          label: 'اسناد مورد نیاز',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'اسناد مورد نیاز',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'شرایط کار',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شرایط کار',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'مدت زمان پروسس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'مدت زمان پروسس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'حق الخدمت شرکت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'حق الخدمت شرکت',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'شرایط زبان',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شرایط زبان',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'بورسیه شخصی / دولتی',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'بورسیه شخصی / دولتی',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'پرداخت اولیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'پرداخت اولیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'هزینه های دیگر',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'هزینه های دیگر',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'فیس سالانه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'فیس سالانه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'فیس دوره',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'فیس دوره',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'آدرس ایمیل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'آدرس ایمیل',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'آدرس دفتر',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'آدرس دفتر',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f5939342304c6554dd0189d: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'اسم و تخلص',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'اسم و تخلص',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'selectOption',
          label: 'جنسیت',

          size: {
            sm: 12,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'جنسیت',
              value: d,
            }).then(() => {});
          },
          placeholder: 'جنسیت',
          selectOptionText: 'انتخاب جنسیت ',
          children: [
            {
              value: 'مرد',
              name: 'مرد',
            },
            {
              value: 'زن',
              name: 'زن',
            },
          ],
        },
        {
          type: 'input',
          label: 'سن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'سن',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'درجه تحصیل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'درجه تحصیل',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'تجربه کاری',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تجربه کاری',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'مدت زمان تجربه کاری',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'مدت زمان تجربه کاری',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'checkbox',
          label: 'بلدیت به زبان های',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            pushArrayToDataArray({
              name: 'بلدیت به زبان های',
              value: d,
            }).then(() => {});
          },
          placeholder: 'بلدیت به زبان های',
          selectOptionText: 'انتخاب زبان',
          children: [
            {
              value: 'تورکی',
              name: 'تورکی',
            },
            {
              value: 'فارسی',
              name: 'فارسی',
            },
            {
              value: 'انگلیسی',
              name: 'انگلیسی',
            },
          ],
        },
      ],
      buttons: [],
    },
  },
  x5f5939d12304c6554dd0189e: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'عنوان وظیفه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'عنوان وظیفه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام شرکت  /  نهاد',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام شرکت  /  نهاد',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'selectOption',
          label: 'درجه تحصیل',

          size: {
            sm: 12,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'درجه تحصیل',
              value: d,
            }).then(() => {});
          },
          placeholder: 'درجه تحصیل',
          selectOptionText: 'انتخاب درجه تحصیل',
          children: [
            {
              value: 'دوکتورا',
              name: 'دوکتورا',
            },
            {
              value: 'ماستر',
              name: 'ماستر',
            },
            {
              value: 'لیسانس',
              name: 'لیسانس',
            },
            {
              value: 'بکلوریا',
              name: 'بکلوریا',
            },
            {
              value: 'مهم نیست',
              name: 'مهم نیست',
            },
          ],
        },
        {
          type: 'input',
          label: 'تجربه کاری',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تجربه کاری',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'معاش ماهانه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'معاش ماهانه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'زبان',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'زبان',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'محل وظیفه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'محل وظیفه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },

        {
          type: 'selectOption',
          label: 'جنسیت',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'جنسیت',
              value: d,
            }).then(() => {});
          },
          placeholder: 'جنسیت',
          selectOptionText: 'انتخاب جنسیت',
          children: [
            {
              value: 'مهم نیست',
              name: 'مهم نیست',
            },
            {
              value: 'مرد',
              name: 'مرد',
            },
            {
              value: 'زن',
              name: 'زن',
            },
          ],
        },
        {
          type: 'input',
          label: 'آدرس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'آدرس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'ایمیل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ایمیل',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تلفن ثابت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تلفن ثابت',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aa6079f0cf294558bb4e: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },

        {
          type: 'input',
          label: 'عمر ساختمان',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'عمر ساختمان',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '۹ سال',
          child: [],
        },
        {
          type: 'input',
          label: 'طبقه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'طبقه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '4',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد طبقات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد طبقات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '10',
          child: [],
        },
        {
          type: 'input',
          label: 'آشپزخانه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'آشپزخانه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد حمام ها',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد حمام ها',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '2',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد اتاق ها',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد اتاق ها',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '8',
          child: [],
        },
        {
          type: 'input',
          label: 'تشناب',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تشناب',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '1',
          child: [],
        },
        {
          type: 'input',
          label: 'بالکن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'بالکن',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'سیستم گرما و سرما',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'سیستم گرما و سرما',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'ناحیه',
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'شماره تماس',
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aa7179f0cf294558bb4f: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },

        {
          type: 'input',
          label: 'عمر ساختمان',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'عمر ساختمان',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '۹ سال',
          child: [],
        },
        {
          type: 'input',
          label: 'طبقه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'طبقه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '4',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد طبقات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد طبقات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '10',
          child: [],
        },
        {
          type: 'input',
          label: 'آشپزخانه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'آشپزخانه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد حمام ها',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد حمام ها',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '2',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد اتاق ها',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد اتاق ها',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '8',
          child: [],
        },
        {
          type: 'input',
          label: 'تشناب',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تشناب',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '1',
          child: [],
        },
        {
          type: 'input',
          label: 'بالکن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'بالکن',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'سیستم گرما و سرما',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'سیستم گرما و سرما',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aa9079f0cf294558bb50: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },
        {
          type: 'input',
          label: 'عمر ساختمان',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'عمر ساختمان',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '۹ سال',
          child: [],
        },
        {
          type: 'input',
          label: 'طبقه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'طبقه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '4',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد طبقات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد طبقات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '10',
          child: [],
        },
        {
          type: 'input',
          label: 'آشپزخانه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'آشپزخانه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد حمام ها',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد حمام ها',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: '2',
          child: [],
        },
        {
          type: 'input',
          label: 'تعداد اتاق ها',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تعداد اتاق ها',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '8',
          child: [],
        },
        {
          type: 'input',
          label: 'تشناب',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'تشناب',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '1',
          child: [],
        },
        {
          type: 'input',
          label: 'بالکن',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'بالکن',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'سیستم گرما و سرما',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'سیستم گرما و سرما',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'دارد / ندارد',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'ناحیه',
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: 'شماره تماس',
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aab079f0cf294558bb52: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },

        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          className: 'rtl',
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          // placeholder: "90",
          child: [],
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aac279f0cf294558bb53: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'ناحیه',
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'شماره تماس',
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aad279f0cf294558bb54: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'ناحیه',
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'شماره تماس',
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aae579f0cf294558bb55: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },

        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aaf079f0cf294558bb56: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },

        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  x5f67aa9e79f0cf294558bb51: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'نوع تبادله',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (d) => {
            addToDataArray({
              name: 'نوع تبادله',
              value: d,
            }).then(() => {});
          },
          placeholder: 'نوع تبادله',
          selectOptionText: 'انتخاب نوع تبادله',
          children: [
            {
              value: 'فروشی',
              name: 'فروشی',
            },
            {
              value: 'گروی',
              name: 'گروی',
            },
            {
              value: 'کرایی',
              name: 'کرایی',
            },
          ],
        },

        {
          type: 'input',
          label: 'متراژ ناخالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ ناخالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },
        {
          type: 'input',
          label: 'متراژ خالص (متر مربع)',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'متراژ خالص (متر مربع)',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          placeholder: '90',
          child: [],
        },

        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'قیمت',
              value: d,
            }).then(() => {});
          },

          placeholder: '2,000,000 تومان یا دالر',
          child: [],
        },
        {
          type: 'input',
          label: 'ناحیه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'ناحیه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'گذر / قریه / محله',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'گذر / قریه / محله',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'کوچه',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'کوچه',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          // placeholder: "90",
          child: [],
        },
        {
          type: 'input',
          label: 'نام فروشنده / راهنمای معاملات',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'نام فروشنده / راهنمای معاملات',
              value: d,
            }).then(() => {});
          },
          // className: "ltr",
          placeholder: 'نام و نام خانوادگی',
          child: [],
        },
        {
          type: 'input',
          label: 'شماره تماس',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (d) => {
            addToDataArray({
              name: 'شماره تماس',
              value: d,
            }).then(() => {});
          },
          className: 'ltr',
          // placeholder: "90",
          child: [],
        },
        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {},
          className: 'height50',
          child: [],
        },
      ],
      buttons: [],
    },
  },
  sellCar: {
    add: {
      data: {},
      fields: [
        {
          type: 'selectOption',
          label: 'برند خودرو',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (sabegheKar) => {
            pageData.estekhdam.add.data['sabegheKar'] = sabegheKar;
          },
          placeholder: 'برند خودرو',
          selectOptionText: 'انتخاب برند خودرو',
          children: [
            {
              value: '1',
              name: 'زیر ۱ سال',
            },
            {
              value: '2',
              name: 'بین ۱ الی ۳ سال',
            },
            {
              value: '3',
              name: 'بین ۳ الی ۸ سال',
            },
            {
              value: '4',
              name: 'بالای ۸ سال',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'مدل خودرو',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (sabegheKar) => {
            pageData.estekhdam.add.data['sabegheKar'] = sabegheKar;
          },
          placeholder: 'مدل خودرو',
          selectOptionText: 'انتخاب مدل خودرو',
          children: [
            {
              value: '1',
              name: 'زیر ۱ سال',
            },
            {
              value: '2',
              name: 'بین ۱ الی ۳ سال',
            },
            {
              value: '3',
              name: 'بین ۳ الی ۸ سال',
            },
            {
              value: '4',
              name: 'بالای ۸ سال',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'سال خودرو',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (sabegheKar) => {
            pageData.estekhdam.add.data['sabegheKar'] = sabegheKar;
          },
          placeholder: 'سال خودرو',
          selectOptionText: 'انتخاب برند خودرو',
          children: [
            {
              value: '1',
              name: 'زیر ۱ سال',
            },
            {
              value: '2',
              name: 'بین ۱ الی ۳ سال',
            },
            {
              value: '3',
              name: 'بین ۳ الی ۸ سال',
            },
            {
              value: '4',
              name: 'بالای ۸ سال',
            },
          ],
        },
        {
          type: 'selectOption',
          label: 'وضعیت تصادف',

          size: {
            sm: 12,
            lg: 6,
          },
          // value:"",
          onChange: (Stu) => {
            pageData.estekhdam.add.data['Stu'] = Stu;
          },
          placeholder: 'وضعیت تصادف',
          selectOptionText: 'انتخاب وضعیت',
          children: [
            {
              value: 'has',
              name: 'تصادف دارد',
            },
            {
              value: 'no',
              name: 'بدون تصادف',
            },
          ],
        },

        {
          type: 'input',
          label: 'شماره موبایل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.estekhdam.add.data['phoneNumber'] = text;
          },
          className: 'ltr',
          placeholder: '0912*******',
          child: [],
        },
        {
          type: 'input',
          label: 'قیمت',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.estekhdam.add.data['age'] = text;
          },

          placeholder: '2,000,000 تومان',
          child: [],
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            savePost({ lastname: text });

            console.log(text);
          },
          className: 'height50',
          placeholder: 'ایمیل (اختیاری)',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: ['title', 'text'],
          url: '/customer/d',
          name: 'ذخیره اطلاعات',
          size: {
            sm: 12,
            lg: 6,
          },
          onClick: async (e) => {
            console.log('this.data', pageData.estekhdam.add.data);
            let {
              firstName,
              lastName,
              phoneNumber,
              sex,
            } = pageData.estekhdam.add.data;

            let err = '';
            if (!firstName) err = 'نام خود را وارد کنید';

            if (!lastName) err = 'نام خانوادگی خود را وارد کنید';
            if (!phoneNumber) err = 'شماره تماس خود را وارد کنید';
            if (!sex) err = 'جنسیت خود را وارد کنید';
            if (err) return toast.error(err);

            sendExtra('estekhdam', pageData.estekhdam.add.data).then((res) => {
              console.log('res for addDriver is:', res);
              toast.success(
                'درخواست شما ثبت شد و در اسرع وقت بررسی و با شما تماس گرفته می شود!'
              );
            });
          },
        },
      ],
    },
  },
  boy: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'شماره موبایل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.boy.add.data['phoneNumber'] = text;
          },
          className: 'ltr',
          placeholder: '98912*******',
          child: [],
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            savePost({ lastname: text });
            console.log(text);
          },
          className: 'height50',
          placeholder: 'ایمیل (اختیاری)',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: [],
          params: ['phoneNumber'],
          url: '/boy/customer/number/',
          name: 'ثبت شماره',
          size: {
            sm: 12,
            lg: 6,
          },
          onClick: async (e) => {
            console.log('this.data', pageData.boy.add.data);
            let { phoneNumber } = pageData.boy.add.data;

            if (!phoneNumber) return toast.error('شماره تماس خود را وارد کنید');

            contactBoy(
              'boy/customer/number/' + phoneNumber,
              pageData.estekhdam.add.data
            ).then((res) => {
              console.log('res for addDriver is:', res);
              if (res.success) {
                toast.success(res.message + ' (' + res.customer.count + ') ');
              } else {
                toast.warning(res.message);
              }
            });
          },
        },
      ],
    },
  },
  createLink: {
    add: {
      data: {},
      fields: [
        {
          type: 'input',
          label: 'شماره موبایل',

          size: {
            sm: 6,
            lg: 6,
          },
          onChange: (text) => {
            pageData.boy.add.data['phoneNumber'] = text;
          },
          className: 'ltr',
          placeholder: '98912*******',
          child: [],
        },

        {
          type: 'empty',
          size: {
            sm: 12,
            lg: 12,
          },
          onChange: (text) => {
            savePost({ lastname: text });
            console.log(text);
          },
          className: 'height50',
          placeholder: 'ایمیل (اختیاری)',
          child: [],
        },
      ],
      buttons: [
        {
          type: 'small',
          header: [],
          body: [],
          params: ['phoneNumber'],
          url: '/boy/customer/number/',
          name: 'ثبت شماره',
          size: {
            sm: 12,
            lg: 6,
          },
          onClick: async (e) => {
            console.log('this.data', pageData.boy.add.data);
            let { phoneNumber } = pageData.boy.add.data;

            if (!phoneNumber) return toast.error('شماره تماس خود را وارد کنید');

            contactBoy(
              'boy/customer/number/' + phoneNumber,
              pageData.estekhdam.add.data
            ).then((res) => {
              console.log('res for addDriver is:', res);
              if (res.success) {
                toast.success(res.message + ' (' + res.customer.count + ') ');
              } else {
                toast.warning(res.message);
              }
            });
          },
        },
      ],
    },
  },
};

export default pageData;
