<template>
<div>
    <div class='col-sm-2 col-form-label'>
      <div class='content-sec1'>
        <h3>請選擇商品/服務名字</h3>
        <v-select class='table-sel' v-model='tableSelected' :options='tables'>
            <option class='table-opt' v-for='table in tables' :key='table.id'>{{ table }}</option>
        </v-select>
        <br>
        <h3>確認欄</h3>
        <div class='content-sec2'>
          <p class='selected-section'>{{ tableSelected }}</p>
        </div>
        <button class='btn1' @click='getPgid();resetList();modalVisible1 = true'>生成對話</button>
      </div>
    </div>
    <div class='col-sm-2 col-form-label'>
      <div class='content-sec5'>
        <h3>關鍵詞</h3>
        <input type='text' class='keyword-input-filed' v-model='triggerKeyword'>
      </div>
    </div>
    <div class='col-sm-2 col-form-label'>
      <div class='content-sec6'>
        <h3>標題</h3>
        <input type='text' class='title-input-filed' v-model='title'>
      </div>
    </div>
    <div class='hello'>
    <div v-if='modalVisible1'>
      <div>
      <button class='btn2' @click='showOneUrl'>A</button>
      <button class='btn3' @click='showTwoUrl'>A|B</button>
    </div>
    <div v-if='OneUrl'>
      <div class='modal-sec1'>
        <label>
          <div class='img-field-container'>
            <div>
              <p class='btn-title'>上傳圖片</p>
            </div>
            <input type='file' class='input-img-field' accept='image/*' @change='uploadFile' ref='img'>
          </div>
        </label>
        <div class='img-wrapper1'>
          <img :src='imgFile' class='img-sec'>
        </div>
        <div>
          <input type='text' class='tagField_lv1' v-model='tagName'>
          <p class='tag-title1'>標籤名字:</p>
          <p class='url-title1'>欲傳送Url / 欲輸入訊息</p>
          <input type='text' class='url1-input-filed' v-model='UrlText1'>
          <p class='text-title1'>欲輸入文字訊息（可忽略）</p>
          <textarea class='word1-input-filed' v-model='imgText' v-on:blur='edit = false'></textarea>
          <button class='upload-btn' @click='uploadText1();showPopup();'>上傳</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class='modal-sec1'>
        <label>
          <div class='img-field-container'>
            <div>
              <p class='btn-title'>上傳圖片</p>
            </div>
            <input type='file' class='input-img-field' accept='image/*' @change='uploadFile' ref='img'>
          </div>
        </label>
        <div class='img-wrapper1'>
          <img :src='imgFile' class='img-sec'>
        </div>
        <div>
          <input type='text' class='tagField_lv1' v-model='tagName'>
          <p class='tag-title1'>標籤名字:</p>
          <!-- <input type='text' class='tagField_lv1' v-model='UrlText'> -->
          <p class='url-title2'>左邊 : 欲傳送Url / 欲輸入訊息</p>
          <p class='url-title3'>右邊 : 欲傳送Url / 欲輸入訊息</p>
          <input type='text' class='url1-input-filed' v-model='UrlText2'>
          <input type='text' class='url2-input-filed' v-model='UrlText3'>
          <p class='text-title2'>欲輸入文字訊息（可忽略）</p>
          <textarea class='word2-input-filed' v-model='imgText' v-on:blur='edit = false'></textarea>
          <button class='upload-btn' @click='uploadText2();showPopup();'>上傳</button>
        </div>
      </div>
    </div>
    <router-view></router-view> <!-- 在父組件需要加上這行，router才知道要把子組件顯示在哪裡 -->
  </div>
  </div>
</div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'OneClick',
  data () {
    return {
      tables: '',
      tableSelected: 'testtest',
      pgid: '',
      showMessage: false,
      OneUrl: true,
      imgFile: '',
      imgUrl: '',
      imgText: '',
      pushNum: '',
      tagName: '',
      UrlText: '',
      triggerKeyword: '',
      showModal: false,
      modalVisible1: false,
      modalBgVisible: false,
      test: true,
      UrlText1: '',
      UrlText2: '',
      UrlText3: '',
      title: ''
    }
  },
  created () {
    axios.get('https://clientdropdown-dot-galvanic-ripsaw-281806.df.r.appspot.com/').then(response => {
      this.tables = response.data
    })
  },
  methods: {
    showOneUrl: function () {
      this.OneUrl = true
    },
    showTwoUrl: function () {
      this.OneUrl = false
    },
    getPgid: function () {
      axios.get('https://getpgid-dot-galvanic-ripsaw-281806.df.r.appspot.com/', {
        params: {
          client_name: this.tableSelected
        }
      }).then(response => {
        this.pgid = response.data
      })
    },
    resetList: function () {
      this.pushNum = []
    },
    showModalBody1: function () {
      this.modalVisible1 = true
    },
    showModal1: function () {
      this.showModal = true
      this.modalVisible1 = true
      this.modalBgVisible1 = true
    },
    uploadFile: function () {
      var imgFile = this.$refs.img.files[0]
      this.imgFile = URL.createObjectURL(imgFile)
      // this.imgUrl1 = this.imgFile
      var params = new FormData()
      params.append('image', imgFile)
      // params.append('client_name', 'ibank')
      params.append('client_name', this.tableSelected)
      axios.post('https://uploadimg-dot-galvanic-ripsaw-281806.df.r.appspot.com', params, { withCredentials: true },
        {
          headers:
          {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'multipart/form-data'
          }
        }).then(response => {
        console.log(response.data)
        this.imgUrl = response.data
      }).catch(function (error) {
        for (let key of Object.keys(error)) {
          console.log(key)
          console.log(error[key])
        }
      })
    },
    showPopup: function () {
      alert('已上傳')
    },
    uploadText1: function () {
      var txt1 = '##rich001(1)' + '[' + this.tagName + ']' + '\n' + this.title + '\n'

      var txt2 = '##rich001(2)' + '\n' + this.imgUrl + '\n'

      var txt3 = '##rich001(3)' + '\n' + this.UrlText1 + '\n'

      var txt4 = '##rich001(4)' + '\n' + this.imgText + '\n' + '##end'

      var text = this.imgText

      if (text === '') {
        const accessUrl = 'https://prod.chatannie.com/richMessageApi'
        const adminId = '0001'
        const accountId = this.pgid
        // const accountId = 'gti6djtyy2t-loys-p79l-cx9i-0zbted4b231611'
        const scenarioName = this.title
        const triggerKind = 'keyword'
        const triggerKeywords = this.triggerKeyword
        // console.log(accountId)
        const queryContent = txt1 + txt2 + txt3
        console.log(queryContent)
        axios.post(accessUrl, {
          adminId: adminId,
          accountId: accountId,
          scenarioName: scenarioName,
          triggerKind: triggerKind,
          triggerKeywords: triggerKeywords,
          content: queryContent
        }
        ).then(response => {
          console.log(response)
        })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        const accessUrl = 'https://prod.chatannie.com/richMessageApi'
        const adminId = '0001'
        const accountId = this.pgid
        // const accountId = 'gti6djtyy2t-loys-p79l-cx9i-0zbted4b231611'
        const scenarioName = this.title
        const triggerKind = 'keyword'
        const triggerKeywords = this.triggerKeyword
        // console.log(accountId)
        const queryContent = txt1 + txt2 + txt3 + txt4
        console.log(this.imgText)
        console.log(queryContent)
        axios.post(accessUrl, {
          adminId: adminId,
          accountId: accountId,
          scenarioName: scenarioName,
          triggerKind: triggerKind,
          triggerKeywords: triggerKeywords,
          content: queryContent
        }
        ).then(response => {
          console.log(response)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    //   var requestBody = 'id: ' + accountId + '\n' +
    //     'scenarioName: ' + scenarioName + '\n' +
    //     'triggerKeywords: ' + triggerKeywords + '\n' +
    //     'flexTitle: ' + this.flexTitle + '\n' +
    //     'tag1: ' + this.tagName1 + '\n' +
    //     'tag2: ' + this.tagName2 + '\n' +
    //     'tag3: ' + this.tagName3 + '\n' +
    //     'queryConten: ' + queryContent
    //   console.log(requestBody)

    //   var params1 = new FormData()
    //   params1.append('client_name', this.tableSelected)
    //   params1.append('pushNum', this.selectedPushNum)
    //   params1.append('requestBody', requestBody)

    //   axios.post('https://uploadgooglesheet-dot-galvanic-ripsaw-281806.df.r.appspot.com/', params1,
    //     { headers:
    //       {
    //         'Access-Control-Allow-Origin': '*'

    //       }
    //     }
    //   ).then(response => {
    //     console.log(response)
    //   })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    },
    uploadText2: function () {
      var txt1 = '##rich002(1)' + '[' + this.tagName + ']' + '\n' + this.title + '\n'

      var txt2 = '##rich002(2)' + '\n' + this.imgUrl + '\n'

      var txt3 = '##rich002(3)' + '\n' + this.UrlText2 + '\n'

      var txt4 = '##rich002(4)' + '\n' + this.UrlText3 + '\n'

      var txt5 = '##rich002(5)' + '\n' + this.imgText + '\n' + '##end'

      var text = this.imgText

      if (text === '') {
        const accessUrl = 'https://prod.chatannie.com/richMessageApi'
        const adminId = '0001'
        const accountId = this.pgid
        // const accountId = 'gti6djtyy2t-loys-p79l-cx9i-0zbted4b231611'
        const scenarioName = this.title
        const triggerKind = 'keyword'
        const triggerKeywords = this.triggerKeyword
        // console.log(accountId)
        const queryContent = txt1 + txt2 + txt3 + txt4
        console.log(queryContent)
        axios.post(accessUrl, {
          adminId: adminId,
          accountId: accountId,
          scenarioName: scenarioName,
          triggerKind: triggerKind,
          triggerKeywords: triggerKeywords,
          content: queryContent
        }
        ).then(response => {
          console.log(response)
        })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        const accessUrl = 'https://prod.chatannie.com/richMessageApi'
        const adminId = '0001'
        const accountId = this.pgid
        // const accountId = 'gti6djtyy2t-loys-p79l-cx9i-0zbted4b231611'
        const scenarioName = this.title
        const triggerKind = 'keyword'
        const triggerKeywords = this.triggerKeyword
        // console.log(accountId)
        const queryContent = txt1 + txt2 + txt3 + txt4 + txt5
        console.log(queryContent)
        axios.post(accessUrl, {
          adminId: adminId,
          accountId: accountId,
          scenarioName: scenarioName,
          triggerKind: triggerKind,
          triggerKeywords: triggerKeywords,
          content: queryContent
        }
        ).then(response => {
          console.log(response)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>
<style scoped>
.content-sec1 {
  position: relative;
  left: 20px;
  background-color: lightgray;
  height: 300px;
  width: 130%;
  border-radius: 3%;
  padding: 0.5em 1em;
  margin: 4em 0;
  color: #5d627b;
  background: white;
  border-top: solid 8px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  text-align: center;
}
.table-sel {
  border: 5px ridge gray;
  text-align: center;
}
.content-sec2 {
  border: 5px ridge gray;
  height: 50px;
  text-align: center;
  font-weight: bold;
}
.btn1{
  right: 35%;
  background-color: aquamarine;
  position: absolute;
  top:77%;
  height: 50px;
  border-radius: 6px;
  width: 100px;
}
.selected-section {
  position: relative;
  top: 23%;
}
.btn2 {
  right: 55%;
  background-color: aquamarine;
  position: absolute;
  top:20%;
  height: 100px;
  border-radius: 6px;
  width: 100px;
}
.btn3 {
  right: 45%;
  background-color: aquamarine;
  position: absolute;
  top:20%;
  height: 100px;
  border-radius: 6px;
  width: 100px;
}
.upload-btn {
  position: absolute;
  width: 15%;
  height: 10%;
  left: 69.5%;
  top:95%;
  border-radius: 4px;
  background-color: lightskyblue;
  border-radius: 3px;
  color:#ffffff;
}
.keyword-input-filed {
  border: 2px solid gray;
}
.title-input-filed {
  border: 2px solid gray;
}
.content-sec5 {
  top: -110px;
  left: 45px;
  background-color: lightgray;
  height: 150px;
  width: 270px;
  position: relative;
  border-radius: 3%;
  padding: 0.5em 1em;
  margin: 4em 0;
  color: #5d627b;
  background: white;
  border-top: solid 8px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  text-align: center;
}
.content-sec6 {
  top: -220px;
  left: 45px;
  background-color: lightgray;
  height: 150px;
  width: 270px;
  position: relative;
  border-radius: 3%;
  padding: 0.5em 1em;
  margin: 4em 0;
  color: #5d627b;
  background: white;
  border-top: solid 8px #5d627b;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
  text-align: center;
}
.img-field-container {
  height: 50px;
  width: 120px;
  top: 97%;
  left: 43%;
  position: absolute;
  display: inline-block;
  padding: 0.25em 0.5em;
  text-decoration: none;
  color: #FFF;
  background: #fd9535;/*色*/
  border-radius: 4px;/*角の丸み*/
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.05);
  font-weight: bold;
  z-index: 99999;
}
.img-field-container:hover {
  /*押したとき*/
  opacity: 0.7;

}
.btn-title {
  position: absolute;
  margin-left: 13%;
  top: 10px
}
.input-img-field {
  display: none;
}
.tagField_lv1 {
  position: absolute;
  top: 38%;
  left: 70%;
  color: gray;
  border: 4px solid gray;
  border-radius: 3px;
}
.tag-title1 {
  position: absolute;
  top: 38%;
  left: 64%;
  color: gray;
}
.url-title1 {
  position: absolute;
  top: 50%;
  left: 70%;
  color: gray;
}
.url-title2 {
  position: absolute;
  top: 50%;
  left: 68%;
  color: gray;
}
.url-title3 {
  position: absolute;
  top: 62%;
  left: 68%;
  color: gray;
}
.text-title1 {
  position: absolute;
  top: 66%;
  left: 70%;
  color: gray;
}
.text-title2 {
  position: absolute;
  top: 76%;
  left: 70%;
  color: gray;
}
.url1-input-filed {
  border: 2px solid gray;
  position: absolute;
  top: 53%;
  left: 70%;
}
.url2-input-filed {
  border: 2px solid gray;
  position: absolute;
  top: 65%;
  left: 70%;
}
.word1-input-filed {
  border: 2px solid gray;
  position: absolute;
  top: 70%;
  left: 67%;
  height: 12%;
  width: 20%;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #eeeeee);/*背景色*/
  background: -webkit-linear-gradient(top, #ffffff, #eeeeee);/*背景色*/
  border: 1px solid #eeeeee;/*枠線*/
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 1) inset;
  white-space:pre;
}
.word2-input-filed {
  border: 2px solid gray;
  position: absolute;
  top: 80%;
  left: 67%;
  height: 12%;
  width: 20%;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #eeeeee);/*背景色*/
  background: -webkit-linear-gradient(top, #ffffff, #eeeeee);/*背景色*/
  border: 1px solid #eeeeee;/*枠線*/
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 1) inset;
  white-space:pre;
}
.img-sec {
  position: absolute;
  height: 400px;
  width: 500px;
  top: 42%;
  left: 30%;
}
</style>
