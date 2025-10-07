const today = new Date().toISOString().split("T")[0];
document.getElementById("checkin").setAttribute("min", today);
const checkout = document.getElementById("checkout");
let checkin=document.getElementById("checkin");
checkin.addEventListener("change", function(){
    if(checkin.value){
        let date=new Date(checkin.value);
        date.setDate(date.getDate()+1);
        let new_date=date.toISOString().split("T")[0];
        checkout.setAttribute("min",new_date);
    }
});
