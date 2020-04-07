var counter = 0;
function changeBG(){
	
	  var imgs = [
		"url(https://urcripton.com/wp-content/uploads/2019/01/event-management2.jpg?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
		"url(https://www.creativiva.com/wp-content/uploads/2016/05/decor-blog-1.jpg?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
		"url(https://images.squarespace-cdn.com/content/v1/5acbd4183e2d0914badf4753/1523312483058-13LX3BVT151K28XU9H0N/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1USOFn4xF8vTWDNAUBm5ducQhX-V3oVjSmr829Rco4W2Uo49ZdOtO_QXox0_W7i2zEA/CEO_Event_Management_Company_Edmonton.jpg?format=1500w?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
		"url(https://www.moneycrashers.com/wp-content/uploads/2019/04/plan-kids-birthday-party-budget.jpg?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
		"url(https://maherjaber.com/wp-content/uploads/2016/04/15.jpg?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)",
		"url(https://the-maharani-diaries-zxpo8io6akeffozy.netdna-ssl.com/media/2019/06/19004050/8-Ways-To-Enhance-Your-Indian-Wedding-Reception_The-Maharani-Diaries.jpg?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)"
	  ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 3000);


