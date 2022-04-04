// Import stylesheets
import "./style.css"

// Body element
const body = document.getElementById('body')

// Button elements
const btnSend = document.getElementById("btnSend")
const btnClose = document.getElementById("btnClose")
const btnShare = document.getElementById("btnShare")
const btnLogIn = document.getElementById("btnLogIn")
const btnLogOut = document.getElementById("btnLogOut")
const btnScanCode = document.getElementById("btnScanCode")
const btnOpenWindow = document.getElementById("btnOpenWindow")

// Profile elements
const email = document.getElementById("email")
const userId = document.getElementById("userId")
const pictureUrl = document.getElementById("pictureUrl")
const displayName = document.getElementById("displayName")
const statusMessage = document.getElementById("statusMessage")

// QR element
const code = document.getElementById("code")
const friendShip = document.getElementById("friendShip")

async function main() {
  // app
  // Initialize LIFF app)
  await liff.init({ liffId: "1657028128-AZZRlYjN" })
  
  // Try a LIFF function
  switch (liff.getOS()) {
    case "android": body.style.backgroundColor = "#23df56"; break
    case "ios": body.style.backgroundColor = "#eeeeee"; break
    default: body.style.backgroundColor = "#df32ac";
  }

  

  
    if (!liff.isInClient()) {
      if (liff.isLoggedIn()) {
        btnShare.style.display = "block"
        btnLogIn.style.display = "none"
        btnLogOut.style.display = "block"
        getUserProfile();
      } else {
        btnLogIn.style.display = "block"
        btnLogOut.style.display = "none"
      }
    } else {
      getUserProfile();
      btnShare.style.display = "block"
      btnSend.style.display = "block";
    }
  

}
main()

async function getUserProfile() {
  const profile = await liff.getProfile()
  pictureUrl.src = profile.pictureUrl
  userId.innerHTML = "<b>userId:</b> " + profile.userId
  statusMessage.innerHTML = "<b>statusMessage:</b> " + profile.statusMessage
  displayName.innerHTML = "<b>displayName:</b> " + profile.displayName
  email.innerHTML = "<b>email:</b> " + liff.getDecodedIDToken().email
}

btnLogIn.onclick = () => {
  liff.login()
}

btnLogOut.onclick = () => {
  liff.logout()
  window.location.reload()
}

async function sendMsg() {
  if (liff.getContext().type !== "none" && liff.getContext().type !== "external") {
    await liff.sendMessages([
      {
        "type": "text",
        "text": "This message was sent by sendMessages()"
      },
      {
        "type": "text",
        "text": "Hello Arisu."
      },
      {
        "type": "text",
        "text": "Yo yo, Are you OK ?" 
      }
    ])
    alert("Message sent")
  }
}

btnSend.onclick = () => {
  sendMsg();
}

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: "image",
      originalContentUrl: "https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg",
      previewImageUrl: "https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg"
    }, 
    {
      type: "text",
      text: "Hello Hello."
    }
  ])
}

btnShare.onclick = () => {
  shareMsg();
}