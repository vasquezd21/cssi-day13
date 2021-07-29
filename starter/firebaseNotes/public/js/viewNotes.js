window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      const googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderData(data);
  });
};

const renderData = (data) => {
    const destination = document.querySelector('#app');
    destination.innerHTML = "";
    for (let key in data) {
        const note = data[key];
        destination.innerHTML += createCard(note);
    }
};

const createCard = (note) => {
    return `<div class="column is-one-quarter">
                <div class="card"> 
                    <header class="card-header"> 
                        <p class="card-header-title"> 
                            ${note.title} 
                        </p> 
                    </header> 
                    <div class="card-content"> 
                        <div class="content">
                            ${note.text} 
                        </div>
                    </div> 
                </div>
            </div>`;
};