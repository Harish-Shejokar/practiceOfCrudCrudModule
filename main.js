const submit = document.getElementById('btn');
submit.addEventListener("click", saveDataOnCrudCrud);


var editID = null;

function saveDataOnCrudCrud(event){
        event.preventDefault();
    
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let state = document.getElementById('inputState').value;
    
        if (name === '' || email === '' || state === '') {
            confirm("name , email and state are compulsory")
            return;
        }
    
        let obj = {
            name,
            email,
            state
        }
        // console.log(obj)
        if(editID){
            axios
                .put(`https://crudcrud.com/api/751e68f5dd1a46f5bbfdf61ec1231555/ApplicationData/${editID}`,
                obj)
                .then(res =>{
                    console.log(res)
                    showUserOnUI(editID);
                })
                .catch(err => console.log(err));

        }
        else{
        axios
            .post('https://crudcrud.com/api/751e68f5dd1a46f5bbfdf61ec1231555/ApplicationData'
                , obj)
            .then(res => {
                console.log(res.data)
                showUserOnUI(res.data._id);
            })
            .catch(err => console.log(err))
        }
    
}


function showUserOnUI(ID) {
    // console.log(ID)

    document.getElementById("name").value  = '';
    document.getElementById("email").value  = '';
    document.getElementById("inputState").value  = 'State';

    
    axios
        .get(`https://crudcrud.com/api/751e68f5dd1a46f5bbfdf61ec1231555/ApplicationData/${ID}`)
        .then(res => {
            let name = res.data.name;
            let email = res.data.email;

            // console.log(res.data.name)

            let parentElem = document.getElementById('userList');
            let childElem = `<li id = ${ID}> ${name} ${email}
                    <button class="btn btn-warning m-2" onclick=editUser('${ID}')>Edit</button>
                    <button class="btn btn-danger " onclick=deleteUser('${ID}')>Delete</button>
                  </li>`

            parentElem.innerHTML = parentElem.innerHTML + childElem;

        }).catch(err => console.log(err));

}

function deleteUser(ID) {

    axios
        .delete(`https://crudcrud.com/api/751e68f5dd1a46f5bbfdf61ec1231555/ApplicationData/${ID}`)
            .then(res =>{
                removeUserFromUI(ID);
                console.log(res);
            })
            .catch(err => console.log(err));


}


function removeUserFromUI(ID) {
    // console.log(ID);
    let parentElem = document.getElementById("userList");
    let childElem = document.getElementById(ID);
    // console.log(parentElem);
    // console.log(childElem );
    parentElem.removeChild(childElem);

}


function editUser(ID) {
    console.log(ID)
    
    axios.get(`https://crudcrud.com/api/751e68f5dd1a46f5bbfdf61ec1231555/ApplicationData/${ID}`)
    .then(res =>{
        removeUserFromUI(ID);
        editID = ID;
        // console.log(res.data.name);
        document.getElementById('name').value = res.data.name;
        document.getElementById('email').value = res.data.email;
        document.getElementById('inputState').value = res.data.state;

       
    
    })
    .catch(err => console.log(err));

    


}



document.addEventListener("DOMContentLoaded", () => {
    axios.
        get('https://crudcrud.com/api/751e68f5dd1a46f5bbfdf61ec1231555/ApplicationData')
        .then(res => {
            let data = res.data;
            // console.log(data.length);

            data.forEach(elem => {
                // console.log(elem._id);

                showUserOnUI(elem._id)
            });

        })
})
