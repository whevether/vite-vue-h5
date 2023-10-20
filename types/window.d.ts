// * global
declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
		browserLanguage: string;
	}
	interface Window {
    zhiu: zhiuFunName,
    [JsText: string]: any
  }
  interface zhiuFunName {
		back: any,
		getIdCode: any,
		showtest: any,
		logOut: any,
		versionName: any,
		getQuestionTypeConfiglist: any
		getHelpsConfiglist: any,
		getAgreementConfiglist: any,
		getGoldChangeLogList: any,
		getAccountChangeLogList: any,
		getStarList: any,
		getFansList: any,
		getFriendList: any,
		queryGirlDailyTasksList: any,
		saveOrUpdateDailyTasksData: any,
		getSignInTasksConfig: any,
		addSignInTasksData: any,
		postDynamicActPush: any,
		girlNewTaskList: any,
		girlNewTaskFinish: any,
		phoneContact: any,
		openSysShareText: any,
		findGoldList: any,
		getDiamondChangeLogList: any,
		userInfoBasic: any,
		withdrawalsGoldCoin: any,
		findDiamondsList: any,
		withdrawalsDiamond: any,
		feeSetting: any,
		withdraw: any,
		findWithdrawList: any,
		bandBank: any,
		basicsPayConfigList: any,
		personWithdrawList: any,
		editBandBank: any,
		updateSelectBank: any,
		getDiamondConfig: any,
		getVipConfig: any,
		showNavbar: any,
		attention: any,
		withdrawalsPurse: any,
		invadeStatusBar: any,
		getCurrentChannelId: any,
		createInvoiceDiamond: any,
		createInvoiceVip: any,
		asyncUserInfo: any,
		searchUser: any,
		memberAccount: any,
		openSettingsData: any,
		openEditMainPage: any,
		openAddVoiceSignature: any,
		openHomeRecommendPage: any,
		updateDiamondsCharge: any,
		updateCustomRecharge: any,
		statusBarColor: any,
		statusBarDarkFont: any,
		uploadSingleImg: any
	}
}

export {};
