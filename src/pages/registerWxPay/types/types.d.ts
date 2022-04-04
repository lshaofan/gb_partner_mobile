type orderData = {
  order: object;
};
export type resOrder = {
  data: {
    data: orderData;
    header: string;
    statusCode: number;
  };
};
export type Info = {
  img1: string;
  img2: string;
};
export type subjectInfo = {
  // 主体类型
  subject_type: string;
  // 营业执照
  business_license_info: {
    license_copy: '';
    // 注册号统一社会信用代码
    license_number: string;
    // 商户名称
    merchant_name: string;
    // 个体户经营者/法人姓名
    legal_person: string;
  };
  // 身份信息
  identity_info: {
    // 身份类型
    id_doc_type: string;
    // 身份证信息
    id_card_info: {
      // 身份证正面照片
      id_card_copy: string;
      //身份证国徽面照片
      id_card_national: string;
      // 身份证姓名
      id_card_name: string;
      // 身份证号码
      id_card_number: string;
      // 身份证有效期开始时间
      card_period_begin: string;
      // 身份证有效期结束时间
      card_period_end: string;
    };
  };
};
export type businessInfo = {
  //商户简称
  merchant_shortname: string;
  // 客服电话
  service_phone: string;
  // 经营场景
  sales_info: {
    // 经营场景类型
    sales_scenes_type: [];
    // 线下门店
    biz_store_info: {
      // 门店名称
      biz_store_name: string;
      // 门店省市编码
      biz_address_code: string;
      // 门店地址
      biz_store_address: string;
      // 门店照片
      store_entrance_pic: string;
      //店内环境照
      indoor_pic: string;
      //线下场所APPID
      biz_sub_appid: string;
    };
    // 商家小程序APPID
    mini_program_info: {
      // 商家小程序APPID
      mini_program_sub_appid: string;
    };
  };
};
export type settlementInfo = {
  //入住结算规则id
  settlement_id: string;
  //行业
  qualification_type: string;
  // 结算信息
  bank_account_info: {
    //账户类型
    bank_account_type: string;
    // 开户名称
    account_name: string;
    //开户银行
    account_bank: string;
    //开户银行省市编码
    bank_address_code: string;
    //开户银行全称
    bank_name: string;
    //银行账号
    account_number: string;
  };
};
export type orderInfo = {
  //超级管理员类型
  contact_type: string;
  contact_info: {
    contact_name: string;
    contact_id_number: string;
    mobile_phone: string;
    contact_email: string;
  };
};
