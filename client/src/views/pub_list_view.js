var PubListView = function(listElement){
  this.listElement = listElement
}

PubListView.prototype = {
  render: function(pubs){
    for (var i=0; i<pubs.length; i++){
      var pubDiv = document.createElement('div')
      pubDiv.classList.add('pub-div')
      pubDiv.id = 'pub-entry' + pubs[i].id

      this.createNameParagraph(pubDiv, pubs[i])
      this.listElement.appendChild(pubDiv)
    }
  },

  createReviewList: function(div, pub){
    if (pub.reviews.length !== 0){
      var reviewSectionTitle = document.createElement('p')
      reviewSectionTitle.innerText = 'Reviews:'
      div.appendChild(reviewSectionTitle)
      var reviewList = document.createElement('ul')
      for (var review of pub.reviews){
        var li = document.createElement('li')
        li.innerText = review
        reviewList.appendChild(li)
      }
      div.appendChild(reviewList)
    }
  },

  createImgLink: function(div, pub){
    if (pub.img){
      var pubImg = document.createElement('img')
      pubImg.src = pub.img
      pubImg.width = 200
      div.appendChild(pubImg)
    }
  },

  getDropDownArrow: function(pub){
    var dropDownArrow = document.createElement('img')
    dropDownArrow.id = pub.id
    dropDownArrow.classList.add('dropdownarrow')
    dropDownArrow.src = 'dropdown_arrow.png'
    dropDownArrow.style.backgroundColor = 'white'
    dropDownArrow.style.height = '20px'
    dropDownArrow.style.width = '20px'
    return dropDownArrow
  },

  getPubHeader: function(pub){
    var headingDiv = document.createElement('div')
    headingDiv.classList.add('pub-name')
    headingDiv.id = 'pub' + pub.id
    return headingDiv
  },

  getPubNameTitle: function(pub){
    var pubName = document.createElement('h4')
    pubName.innerText = pub.name
    pubName.style.margin = '5px'
    return pubName
  },

  createNameParagraph: function(div, pub){
    var headingDiv = this.getPubHeader(pub)
    var pubName = this.getPubNameTitle(pub)
    var dropDownArrow = this.getDropDownArrow(pub)

    dropDownArrow.addEventListener('click', function(){
      if (div.childNodes.length <= 2){
        this.dropDownInfo(pub,div)      
      } else {
        this.removeDropDownInfo(div)
        }
      }.bind(this))

    headingDiv.appendChild(dropDownArrow)
    headingDiv.appendChild(pubName)
    div.appendChild(headingDiv)
  },

  dropDownInfo: function(pub,div){
    var headingDiv = document.querySelectorAll('.pub-name')
    var correctHeading
    headingDiv.forEach(function(individualDiv){
      if (individualDiv.id === ('pub' + pub.id)){
        correctHeading = individualDiv
      }
    }.bind(this))   
   if (correctHeading.parentElement.childNodes.length <= 2){
    this.createImgLink(div, pub)
    this.createAddressParagraph(div, pub)
    this.createOpeningHoursList(div, pub)
    this.createReviewList(div, pub)
  } else {
    this.removeDropDownInfo(correctHeading)
  }
    
    
  },

  removeDropDownInfo: function(div){
    while (div.childNodes.length > 1){
      console.log('calling')
      var node = div.childNodes[1]
      div.removeChild(node)
    }
  },

  createAddressParagraph: function(div, pub){
    if (pub.address){
      var pubAddress = document.createElement('p')
      pubAddress.innerText = "Address: " +pub.address
      div.appendChild(pubAddress)
    }
  },

  createOpeningHoursList: function(div, pub){
    if (pub.opening_hours){
      var pubOpeningHrs = document.createElement('p')
      pubOpeningHrs.innerText = "Opening hours:"
      var openingHoursList = document.createElement('ul')
      this.appendDailyOpeningHours(openingHoursList, pub.opening_hours)
      div.appendChild(pubOpeningHrs)
      div.appendChild(openingHoursList)
    }
  },

  appendDailyOpeningHours: function(list, openingHours){
    for (var day in openingHours){
      var li = document.createElement('li')
      var dayString = this.titleize(day)
      li.innerText = dayString + ": " + openingHours[day]
      list.appendChild(li)
    }
  },

  titleize: function(string){
    var arrayOfChars = string.split("")
    arrayOfChars[0] = arrayOfChars[0].toUpperCase()
    var newString = ""
    for (var char of arrayOfChars){
      newString += char
    }
    return newString
  }
}

module.exports = PubListView
