const bloodField = document.getElementById('bloodGroup');
const genderField = document.getElementById('gender');
const ageField = document.getElementById('age');
const phoneField = document.getElementById('phone');
const dobField = document.getElementById('dob');
const labels = document.getElementsByTagName('label');
const backButton = document.getElementById('back');
const editButton = document.getElementById('edit');
const deleteButton = document.getElementById('delete');

bloodField.addEventListener('click', () => {
    labels[0].classList.toggle("focused-field");
});

ageField.addEventListener('focus', () => {
    labels[1].classList.toggle("focused-field");
});

phoneField.addEventListener('focus', () => {
    labels[4].classList.toggle("focused-field");
});
phoneField.addEventListener('blur', () => {
    if (!phoneField.value)
        labels[4].classList.toggle("unfocused-field");
});

ageField.addEventListener('blur', () => {
    if (!ageField.value)
        labels[1].classList.toggle("unfocused-field");
});

bloodField.addEventListener('blur', () => {
    if (!bloodField.value)
        labels[0].classList.toggle("unfocused-field");
});


console.log(labels);
const auth = firebase.auth();

// Just to print your current user information so you can the changes once done
auth.onAuthStateChanged(user => {
    console.log(user);
});

var id = localStorage.getItem('id');
const editInformation = () => {
   console.log("Hii");
let userRef = firebase.database().ref('Users/' + id);
 userRef.child('data').set({'Blood': bloodField.value,'Gender':genderField.value,'Age':ageField.value,'Dob':dobField.value,'Phone':phoneField.value}).then(() => {
    alert('BloodGroup Updated Successfully !');
})
    .catch(error => {
        console.error(error);
    })


  
}
editButton.addEventListener('click', editInformation);
const deleteAccount = () => {
    const user = auth.currentUser;
    const credential = createCredential(user);
    user.reauthenticateWithCredential(credential)
        .then(() => {
            user.delete();
            alert("Your Account Has Been Deleted!");
            window.location('./index.html');
        })
        .catch(error => {
            console.error(error);
        })
}

deleteButton.addEventListener('click', deleteAccount);



backButton.addEventListener('click', () => {
    window.location.assign('/Saada-Hack/profile.html');
});

//Animations


console.log(labels);


