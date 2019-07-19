users=[];
prom=0;
entrega=0;
recuperar=0;

function addUser(){
	
	userName=document.getElementById("userName");
	userInvestment=document.getElementById("userInvestment");
	if(userName.value == "" ||userInvestment.value == ""){
		prompt("Faltan datos por ingresar");
	}else{

		newLi=document.createElement("li");
		newLi.setAttribute("class","user");
		newLi.innerText=userName.value+" Invirtio: $ "+userInvestment.value;
		ul=document.getElementsByTagName("ul");
		ul[0].appendChild(newLi);
		users.push({
			name:userName.value,
			investment:userInvestment.value,
			investmentRecover:0
		});
		userName.value=null;
		userInvestment.value=null;
		}
}

addUserButton=document.getElementById("addButton");
addUserButton.addEventListener("click",addUser);

function sumInvestment(){
	sum=0;
	users.forEach(function(e){
		sum=sum+parseInt(e.investment);
	});
	return sum;
}

function promInvestment(){
	prom=sumInvestment()/users.length;
	return prom;
}
calculateButton=document.getElementById("calculateButton");

function calculateUsersInvestment(){
	users.forEach(function(e){
		e.investmentRecover=parseInt(e.investment)-prom;
	});
}

function repartir(){
	prom=promInvestment();
	calculateUsersInvestment();

	for(i=0;i<users.length;i++){
		if (users[i].investmentRecover<0) {
			for(j=0;j<users.length;j++){
				while(users[j].investmentRecover>0 && users[i].investmentRecover<0 ) {
					entrega+=0.25;
					recuperar-=0.25;
					users[i].investmentRecover+=0.25;
					users[j].investmentRecover-=0.25;
				}
				if(entrega>0){
					newLi=document.createElement("li");
					newLi.innerText=users[i].name+" entrega a : "+users[j].name+" $"+entrega;
					ul=document.getElementById("investmentRecover");
					divUsers=document.getElementsByClassName("usersList");
					ul.appendChild(newLi);
				}
				entrega=0;
				recuperar=0;
			}
		}
	}
	promLabel=document.createElement("label");
	promLabel.innerText="Cada usuario debe aportar $"+prom;	
	divUsers[0].appendChild(promLabel);				
}
calculateButton.addEventListener("click",repartir);