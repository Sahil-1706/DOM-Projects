const users = document.querySelector(".users");
const inp1 = document.querySelector("#name");
const inp2 = document.querySelector("#email");
const imageUrl = document.querySelector("#image");
const form = document.querySelector("form");

const usersData = [
    {
        "id": 1,
        "name": "Mikasa Ackerman",
        "email": "mikasa.ackerman@example.com",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRhj1fWOSDM4F8IInKZfVDjNxBN-q_0xU0_5ZzfpgqSQ&s=10"
    },
    {
        "id": 2,
        "name": "Naruto Uzumaki",
        "email": "naruto.uzumaki@example.com",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTde9CBTq4nSWD5XmseX_niMvuCWin5pRpmlRGKmnLXlQ&s=10"
    },
    {
        "id": 3,
        "name": "Sakura Haruno",
        "email": "sakura.haruno@example.com",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvVA07zDo00HTSIgt4ZSDC4R4s1wlHzxECOlN8bkvbwg&s"
    },
    {
        "id": 4,
        "name": "Levi Ackerman",
        "email": "levi.ackerman@example.com",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIeObUHtNaAQQbQy82eZAM_q1S5QlJBxUEIvz71Ds4Sg&s=10"
    },
    {
        "id": 5,
        "name": "Hinata Hyuga",
        "email": "hinata.hyuga@example.com",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGwtVtUBD42xFTO06_QQIB3miogOlokPCIp-QK4-r8wQ&s=10"
    },
    {
        "id": 6,
        "name": "Eren Yeager",
        "email": "eren.yeager@example.com",
        "image": "https://i.redd.it/kgktom940g1e1.jpeg"
    }
]

const renderCards = () => {
    users.innerHTML = "";

    usersData.forEach((elem, idx) => {
        users.innerHTML += `
         <div class="user_card">
                <div class="img_box">
                    <img class="img" src="${elem.image}" alt="image here">
                </div>
                <div class="text">
                    <h3>Name : <span>${elem.name}</span> </h3>
                    <p>Email : <span>${elem.email}</span> </p>
                </div>
                <div class="actions">
                    <button onclick="editCard(${idx})" class="edit">Edit</button>
                    <button onclick="deleteCard(${idx})" class="delete">Delete</button>
                </div>
        </div>
        `
    })
}

renderCards();

form.addEventListener("submit", (events) => {
    events.preventDefault();

    let name = inp1.value;
    let email = inp2.value;
    let image = imageUrl.value;

    if (name.trim() === "" && email.trim() === "") return;

    usersData.push({
        id: usersData.length + 1,
        name,
        email,
        image
    })

    renderCards();

    inp1.value = "";
    inp2.value = "";
    imageUrl.value = "";
})

const deleteCard = (idx) => {
    usersData.splice(idx, 1);

    renderCards();
}

const editCard = (idx) => {
    const card = document.querySelectorAll(".user_card")[idx];
    const user = usersData[idx];

    card.querySelector(".text").innerHTML = `
        <h3>
            Name :
            <input class="edit-name" type="text" value="${user.name}">
        </h3>

        <p>
            Email :
            <input class="edit-email" type="email" value="${user.email}">
        </p>
    `;

    card.querySelector(".edit-name").focus();

    card.querySelector(".actions").innerHTML = `
        <button onclick="saveCard(${idx})">Save</button>
    `;
}

const saveCard = (idx) => {
    const card = document.querySelectorAll(".user_card")[idx];

    const newName = card.querySelector(".edit-name").value;
    const newEmail = card.querySelector(".edit-email").value;

    usersData[idx].name = newName;
    usersData[idx].email = newEmail;

    renderCards();
}