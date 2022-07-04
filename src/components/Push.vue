<template>
  <div>
    <h2 class='header-top'></h2>
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
        <button class='btn1' @click='getPgid();searchFiles();resetList();'>生成對話</button>
      </div>
    </div>
    <div class='col-sm-2 col-form-label'>
      <div class='content-sec4'>
        <h3>push編號</h3>
          <v-select class='table-sel' v-model='selectedPushNum' :options='pushNum'>
            <option class='table-opt' v-for='pushNum in pushNum' :key='pushNum.id'>{{ pushNum }}</option>
          </v-select>
          <button class='btn2' @click='getTexts();'>取得對話</button>
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
        <h3>flex標題</h3>
        <input type='text' class='keyword-input-filed' v-model='flexTitle'>
      </div>
    </div>
    <div class='textField-wrapper'>
      <div class='textField-container1'>
        <h3 class='node-lv1'>Lv1</h3>
        <p class='tag-title1'>標籤名字:</p>
        <input type='text' class='tagField_lv1' v-model='tagName1'>
        <textarea class='text-field1' v-model='text1' v-on:blur='edit = false'></textarea>
      </div>
      <div>
        <h3 class='node-lv2'>選擇</h3>
        <textarea class='text-field2' v-model='text2' v-on:blur='edit = false'></textarea>
        <textarea class='text-field3' v-model='text3' v-on:blur='edit = false'></textarea>
      </div>
      <div>
        <h3 class='node-lv3'>Lv2</h3>
        <p class='tag-title2'>標籤名字:</p>
        <input type='text' class='tagField_lv2' v-model='tagName2'>
        <textarea class='text-field4' v-model='text4' v-on:blur='edit = false'></textarea>
        <textarea class='text-field5' v-model='text7' v-on:blur='edit = false'></textarea>
      </div>
      <div>
        <h3 class='node-lv4'>Lv3(Flex)</h3>
        <p class='tag-title3'>標籤名字:</p>
        <input type='text' class='tagField_lv3' v-model='tagName3'>
        <textarea class='text-field6' v-model='text8' v-on:blur='edit = false'></textarea>
        <textarea class='text-field7' v-model='text5' v-on:blur='edit = false'></textarea>
      </div>
      <div>
        <h3 class='node-lv5'>Lv4(Flex)</h3>
        <p class='tag-title4'>標籤名字:</p>
        <input type='text' class='tagField_lv4' v-model='tagName4'>
        <textarea class='text-field8' v-model='text6' v-on:blur='edit = false'></textarea>
        <textarea class='text-field9' v-model='text9' v-on:blur='edit = false'></textarea>
      </div>
    </div>
    <div class='col-sm-2 col-form-label'>
      <div class='flex-sec1'>
        <p>{{text2}}的Flex部分</p>
        <p>標題顏色</p>
        <v-select class='color-sec1' v-model='selectedTitleColor1' :options='colors'>
          <option class='color-sel1' v-for='color in colors' :key='color.id'>
            {{ color }}
          </option>
        </v-select>
        <p>文章顏色</p>
        <v-select class='color-sec1' v-model='selectedEndColor1' :options='colors'>
          <option class='color-sel1' v-for='color in colors' :key='color.id'>
            {{ color }}
          </option>
        </v-select>
        <p>按鈕顏色</p>
        <v-select class='color-sec1' v-model='selectedButtonColor1' :options='colors'>
          <option class='color-sel1' v-for='color in colors' :key='color.id'>
            {{ color }}
          </option>
        </v-select>
        <button class='preview-btn' @click='showModal1'>預覽</button>
        <button class='setting-btn' @click='showModalBody1'>圖片&URL</button>
      </div>
    </div>

    <div class='col-sm-2 col-form-label'>
      <div class='flex-sec2'>
        <p>{{text3}}的Flex部分</p>
        <p>標題顏色</p>
        <v-select class='color-sec2' v-model='selectedTitleColor2' :options='colors'>
          <option class='color-sel2' v-for='color in colors' :key='color.id'>
            {{ color }}
          </option>
        </v-select>
        <p>文章顏色</p>
        <v-select class='color-sec2' v-model='selectedEndColor2' :options='colors'>
          <option class='color-sel2' v-for='color in colors' :key='color.id'>
            {{ color }}
          </option>
        </v-select>
        <p>按鈕顏色</p>
        <v-select class='color-sec2' v-model='selectedButtonColor2' :options='colors'>
          <option class='color-sel2' v-for='color in colors' :key='color.id'>
            {{ color }}
          </option>
        </v-select>
        <button class='preview-btn' @click='showModal2'>預覽</button>
        <button class='setting-btn' @click='showModalBody2'>圖片&URL</button>
      </div>
    </div>

    <div class='l-modal' v-if='modalVisible1'>
      <div class='modalStyle1' @click='hideModal'>
        <div class='img-container'>
          <img :src='imgFile1' class='img-sec'>
        </div>
        <p :style='titleColorStyle1'>{{flexTitleTxt1_1}}</p>
        <p :style='contentColorStyle1'>{{flexContentTxt1_1}}</p>
        <p :style='endColorStyle1'>{{flexEndTxt1_1}}</p>
        <button class='p-modal__btn' :style='buttonColorStyle1'>{{flexButtonTxt1_1}}</button>
      </div>
      <div class='modalStyle2' @click='hideModal'>
        <div class='img-container'>
          <img :src='imgFile2' class='img-sec'>
        </div>
          <p :style='titleColorStyle1'>{{flexTitleTxt1_2}}</p>
          <p :style='contentColorStyle1'>{{flexContentTxt1_2}}</p>
          <p :style='endColorStyle1'>{{flexEndTxt1_2}}</p>
          <button class='p-modal__btn' :style='buttonColorStyle1'>{{flexButtonTxt1_2}}</button>
      </div>
    </div>
    <div class='l-modal__bg' v-if='modalBgVisible1' @click='hideModal'></div>

    <div class='l-modal' v-if='modalVisible2'>
      <div class='modalStyle1' @click='hideModal'>
        <div class='img-container'>
          <img :src='imgFile3' class='img-sec'>
        </div>
          <p :style='titleColorStyle2'>{{flexTitleTxt2_1}}</p>
          <p :style='contentColorStyle2'>{{flexContentTxt2_1}}</p>
          <p :style='endColorStyle2'>{{flexEndTxt2_1}}</p>
          <button class='p-modal__btn' :style='buttonColorStyle2'>{{flexButtonTxt2_1}}</button>
      </div>
      <div class='modalStyle2' @click='hideModal'>
        <div class='img-container'>
          <img :src='imgFile4' class='img-sec'>
        </div>
          <p :style='titleColorStyle2'>{{flexTitleTxt2_2}}</p>
          <p :style='contentColorStyle2'>{{flexContentTxt2_2}}</p>
          <p :style='endColorStyle2'>{{flexEndTxt2_2}}</p>
          <button class='p-modal__btn' :style='buttonColorStyle2'>{{flexButtonTxt2_2}}</button>
      </div>
    </div>
    <div class='l-modal__bg' v-if='modalBgVisible2' @click='hideModal'></div>
    <!--<preview-modal :modalText='text6' :selectedTitleColor='selected_title_color1' :selectedContentColor='selected_content_color1'
    :selectedButtonColor='selected_button_color1'/>-->
    <button class='upload-btn' @click='uploadText();showPopup();'>上傳</button>
    <div class='l-modal-body' v-if='modalVisible3'>
        <div class='modal-sec1'>
          <label>
            <div class='img-field-container'>
              <div>
                <p class='btn-title'>上傳圖片</p>
              </div>
              <input type='file' class='input-img-field' accept='image/*' @change='uploadFile1' ref='img1'>
            </div>
           </label>
          <div class='img-wrapper1'>
            <img :src='imgFile1' class='img-sec'>
          </div>
          <div>
            <p class='link-title-field'>輸入送客連結</p>
            <form>
              <input type='url' class='input-link-field' placeholder='https//' v-model='lp_url1'>
            </form>
          </div>
      </div>
      <div class='modal-sec2'>
          <label>
            <div class='img-field-container'>
              <div>
                <p class='btn-title'>上傳圖片</p>
              </div>
              <input type='file' class='input-img-field' accept='image/*' @change='uploadFile2' ref='img2'>
            </div>
           </label>
          <div class='img-wrapper1'>
            <img :src='imgFile2' class='img-sec'>
          </div>
          <div>
            <p class='link-title-field'>輸入送客連結</p>
            <form>
              <input type='url' class='input-link-field' placeholder='https//' v-model='lp_url2'>
            </form>
          </div>
      </div>
      <button class='modalDetail-btn' @click='closeModalBody1'>Close</button>
    </div>
    <div class='l-modal-body' v-if='modalVisible4'>
        <div class='modal-sec1'>
          <label>
            <div class='img-field-container'>
              <div>
                <p class='btn-title'>上傳圖片</p>
                <input type='file' class='input-img-field' accept='image/*' @change='uploadFile3' ref='img3'>
              </div>
            </div>
           </label>
          <div class='img-wrapper1'>
            <img :src='imgFile3' class='img-sec'>
          </div>
          <div>
            <p class='link-title-field'>輸入送客連結</p>
            <form>
              <input type='url' class='input-link-field' placeholder='https//' v-model='lp_url3'>
            </form>
          </div>
      </div>
      <div class='modal-sec2'>
          <label>
            <div class='img-field-container'>
              <div>
                <p class='btn-title'>上傳圖片</p>
              </div>
              <input type='file' class='input-img-field' accept='image/*' @change='uploadFile4' ref='img4'>
            </div>
           </label>
          <div class='img-wrapper1'>
            <img :src='imgFile4' class='img-sec'>
          </div>
          <div>
            <p class='link-title-field'>輸入送客連結</p>
            <form>
              <input type='url' class='input-link-field' placeholder='https//' v-model='lp_url4'>
            </form>
          </div>
      </div>
      <button class='modalDetail-btn' @click='closeModalBody2'>Close</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'demo1',
  data () {
    return {
      tables: '',
      tableSelected: 'ibank世紀車貸',
      pushNum: ['push1'],
      selectedPushNum: 'push1',
      textList: [],
      pgid: '',
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      text6: '',
      text7: '',
      text8: '',
      text9: '',
      flex_text1_1: '',
      flex_text1_2: '',
      flex_text2_1: '',
      flex_text2_2: '',
      flexTitleTxt1_1: '',
      flexTitleTxt1_2: '',
      flexTitleTxt2_1: '',
      flexTitleTxt2_2: '',
      flexContentTxt1_1: '',
      flexContentTxt1_2: '',
      flexContentTxt2_1: '',
      flexContentTxt2_2: '',
      flexEndTxt1_1: '',
      flexEndTxt1_2: '',
      flexEndTxt2_1: '',
      flexEndTxt2_2: '',
      flexButtonTxt1_1: '',
      flexButtonTxt1_2: '',
      flexButtonTxt2_1: '',
      flexButtonTxt2_2: '',
      colors: ['紅色', '藍色', '黃色', '粉色', '土地色', '水藍色', '灰色', '淺綠色', '橙色'],
      colors_dic: {紅色: '#FF0000', 藍色: '#0000FF', 黃色: '#FFFF00', 粉色: '#FFCCCC', 土地色: '#800000', 水藍色: '#00FFFF', 灰色: '#BBBBBB', 淺綠色: '#99FF33', 橙色: '#FFA500'},
      selectedTitleColor1: '',
      selectedTitleColor2: '',
      selectedEndColor1: '',
      selectedEndColor2: '',
      selectedButtonColor1: '',
      selectedButtonColor2: '',
      modalVisible1: false,
      modalVisible2: false,
      modalVisible3: false,
      modalVisible4: false,
      modalBgVisible1: false,
      modalBgVisible2: false,
      modalTitleColor1: '',
      modalTitleColor2: '',
      modalEndColor1: '',
      modalEndColor2: '',
      modalButtonColor1: '',
      modalButtonColor2: '',
      imgFile1: '',
      imgFile2: '',
      imgFile3: '',
      imgFile4: '',
      imgUrl1: '',
      imgUrl2: '',
      imgUrl3: '',
      imgUrl4: '',
      queryTxt1: '',
      queryTxt2: '',
      queryTxt3: '',
      queryTxt4: '',
      queryTxt5: '',
      queryTxt6: '',
      queryTxt7: '',
      queryTxt8: '',
      queryTxt9: '',
      queryTxt10: '',
      queryTxt11: '',
      queryTxt12: '',
      queryTxt13: '',
      queryTxt14: '',
      queryTxt15: '',
      queryTxt16: '',
      queryTxt17: '',
      queryTxt18: '',
      queryTxt19: '',
      queryTxt20: '',
      queryTxt21: '',
      queryTxt22: '',
      queryTxt23: '',
      queryTxt24: '',
      queryTxt25: '',
      queryTxt26: '',
      queryTxt27: '',
      queryTxt28: '',
      queryTxt29: '',
      queryTxt30: '',
      queryTxt31: '',
      queryTxt32: '',
      queryTxt33: '',
      queryTxt34: '',
      queryTxt35: '',
      queryTxt36: '',
      queryTxt37: '',
      queryTxt38: '',
      tagName1: '',
      tagName2: '',
      tagName3: '',
      tagName4: '',
      lp_url1: '',
      lp_url2: '',
      lp_url3: '',
      lp_url4: '',
      triggerKeyword: '',
      flexTitle: '',
      element: ''
    }
  },
  created () {
    axios.get('https://clientdropdown-dot-galvanic-ripsaw-281806.df.r.appspot.com/').then(response => {
      this.tables = response.data
    })
  },
  watch: {
    selectedTitleColor1: function () {
      this.modalTitleColor1 = this.colors_dic[this.selectedTitleColor1]
    },
    selectedTitleColor2: function () {
      this.modalTitleColor2 = this.colors_dic[this.selectedTitleColor2]
    },
    selectedEndColor1: function () {
      this.modalEndColor1 = this.colors_dic[this.selectedEndColor1]
    },
    selectedEndColor2: function () {
      this.modalEndColor2 = this.colors_dic[this.selectedEndColor2]
    },
    selectedButtonColor1: function () {
      this.modalButtonColor1 = this.colors_dic[this.selectedButtonColor1]
    },
    selectedButtonColor2: function () {
      this.modalButtonColor2 = this.colors_dic[this.selectedButtonColor2]
    }
  },
  computed: {
    titleColorStyle1: function () {
      return {
        color: this.modalTitleColor1,
        position: 'absolute',
        top: '43%',
        left: '29%',
        textAlign: 'center'
      }
    },
    titleColorStyle2: function () {
      return {
        color: this.modalTitleColor2,
        position: 'absolute',
        top: '43%',
        left: '29%',
        textAlign: 'center'
      }
    },
    contentColorStyle1: function () {
      return {
        position: 'absolute',
        top: '55%',
        marginLeft: '40px',
        textAlign: 'center'
      }
    },
    contentColorStyle2: function () {
      return {
        position: 'absolute',
        top: '55%',
        marginLeft: '40px',
        textAlign: 'center'
      }
    },
    endColorStyle1: function () {
      return {
        color: this.modalEndColor1,
        position: 'absolute',
        top: '70%',
        left: '25%',
        textAlign: 'center'
      }
    },
    endColorStyle2: function () {
      return {
        color: this.modalEndColor2,
        position: 'absolute',
        top: '70%',
        left: '25%',
        textAlign: 'center'
      }
    },
    buttonColorStyle1: function () {
      return {
        backgroundColor: this.modalButtonColor1,
        color: 'white'
      }
    },
    buttonColorStyle2: function () {
      return {
        backgroundColor: this.modalButtonColor2,
        color: 'white'
      }
    }
  },
  methods: {
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
      this.modalVisible3 = true
    },
    closeModalBody1: function () {
      this.modalVisible3 = false
    },
    showModalBody2: function () {
      this.modalVisible4 = true
    },
    closeModalBody2: function () {
      this.modalVisible4 = false
    },
    uploadFile1: function () {
      var imgFile1 = this.$refs.img1.files[0]
      this.imgFile1 = URL.createObjectURL(imgFile1)
      // this.imgUrl1 = this.imgFile1
      var params = new FormData()
      params.append('image', imgFile1)
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
        this.imgUrl1 = response.data
      }).catch(function (error) {
        for (let key of Object.keys(error)) {
          console.log(key)
          console.log(error[key])
        }
      })
    },
    uploadFile2: function () {
      var imgFile2 = this.$refs.img2.files[0]
      this.imgFile2 = URL.createObjectURL(imgFile2)
      var params = new FormData()
      params.append('image', imgFile2)
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
        this.imgUrl2 = response.data
      }).catch(function (error) {
        for (let key of Object.keys(error)) {
          console.log(key)
          console.log(error[key])
        }
      })
    },
    uploadFile3: function () {
      var imgFile3 = this.$refs.img3.files[0]
      this.imgFile3 = URL.createObjectURL(imgFile3)
      var params = new FormData()
      params.append('image', imgFile3)
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
        this.imgUrl3 = response.data
      }).catch(function (error) {
        for (let key of Object.keys(error)) {
          console.log(key)
          console.log(error[key])
        }
      })
    },
    uploadFile4: function () {
      var imgFile4 = this.$refs.img4.files[0]
      this.imgFile4 = URL.createObjectURL(imgFile4)
      var params = new FormData()
      params.append('image', imgFile4)
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
        this.imgUrl4 = response.data
      }).catch(function (error) {
        for (let key of Object.keys(error)) {
          console.log(key)
          console.log(error[key])
        }
      })
    },
    uploadText: function () {
      var txt1 = '##001' + '[' + this.tagName1 + ']' + '\n' + this.text1 + '\n'
      var option1 = '##jump001\n' + this.queryTxt2 + '\n'
      var option2 = '##jump002\n' + this.queryTxt3 + '\n'
      var txt2 = '##002<jump001' + '[' + this.tagName2 + ']' + '\n' + this.text4 + '\n##end\n'
      var txt3 = '##004<jump002' + '[' + this.tagName2 + ']' + '\n' + this.text7 + '\n##end\n'

      var flexTxt1 = '##flex(1)000' + '[' + this.tagName3 + ']' + '\n' + this.flexTitle + '\n##flex(1)001\n' + this.imgUrl1 + '\n##flex(1)002\n' + this.queryTxt7 + '\n##flex(1)003\n' + this.queryTxt8 +
      '\n##flex(1)004\n' + this.queryTxt9 + '\n' + this.queryTxt10 + '\n##flex(1)005\n' + '\n##flex(1)006\n' + this.queryTxt11 + '\n' + this.queryTxt12 + '\n##flex(1)007\n' +
      this.lp_url1 + '\n##flex(1)008\n' + this.flexButtonTxt1_1 + '\n##flex(1)009\n' + this.modalButtonColor1 + '\n'

      var flexTxt2 = '##flex(1)010\n' + this.imgUrl2 + '\n##flex(1)011\n' + this.queryTxt14 + '\n##flex(1)012\n' + this.queryTxt15 +
      '\n##flex(1)013\n' + this.queryTxt16 + '\n' + this.queryTxt17 + '\n##flex(1)014\n' + '\n##flex(1)015\n' + this.queryTxt18 + '\n' + this.queryTxt19 + '\n##flex(1)016\n' +
      this.lp_url2 + '\n##flex(1)017\n' + this.flexButtonTxt1_2 + '\n##flex(1)018\n' + this.modalButtonColor1 + '\n'

      var flexTxt3 = '##flex(2)000' + '[' + this.tagName3 + ']' + '\n' + this.flexTitle + '\n##flex(2)001\n' + this.imgUrl3 + '\n##flex(2)002\n' + this.queryTxt25 + '\n##flex(2)003\n' + this.queryTxt26 +
      '\n##flex(2)004\n' + this.queryTxt27 + '\n' + this.queryTxt28 + '\n##flex(2)005\n' + '\n##flex(2)006\n' + this.queryTxt29 + '\n' + this.queryTxt30 + '\n##flex(2)007\n' +
      this.lp_url3 + '\n##flex(2)008\n' + this.flexButtonTxt2_1 + '\n##flex(2)009\n' + this.modalButtonColor2 + '\n'

      var flexTxt4 = '##flex(2)010\n' + this.imgUrl4 + '\n##flex(2)011\n' + this.queryTxt32 + '\n##flex(2)012\n' + this.queryTxt33 +
      '\n##flex(2)013\n' + this.queryTxt34 + '\n' + this.queryTxt35 + '\n##flex(2)014\n' + '\n##flex(2)015\n' + this.queryTxt36 + '\n' + this.queryTxt37 + '\n##flex(2)016\n' +
      this.lp_url4 + '\n##flex(2)017\n' + this.flexButtonTxt2_2 + '\n##flex(2)018\n' + this.modalButtonColor2 + '\n##end'

      const accessUrl = 'https://prod.chatannie.com/saveScenarioApi'
      const adminId = '0001'
      const accountId = this.pgid
      // const accountId = 'gti6djtyy2t-loys-p79l-cx9i-0zbted4b231611'
      const scenarioName = this.selectedPushNum
      const triggerKind = 'keyword'
      const triggerKeywords = this.triggerKeyword
      // console.log(accountId)
      const queryContent = txt1 + option1 + option2 + txt2 + flexTxt1 + flexTxt2 + txt3 + flexTxt3 + flexTxt4
      // console.log(queryContent)
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
      var requestBody = 'id: ' + accountId + '\n' +
        'scenarioName: ' + scenarioName + '\n' +
        'triggerKeywords: ' + triggerKeywords + '\n' +
        'flexTitle: ' + this.flexTitle + '\n' +
        'tag1: ' + this.tagName1 + '\n' +
        'tag2: ' + this.tagName2 + '\n' +
        'tag3: ' + this.tagName3 + '\n' +
        'queryConten: ' + queryContent
      console.log(requestBody)

      var params1 = new FormData()
      params1.append('client_name', this.tableSelected)
      params1.append('pushNum', this.selectedPushNum)
      params1.append('requestBody', requestBody)

      axios.post('https://uploadgooglesheet-dot-galvanic-ripsaw-281806.df.r.appspot.com/', params1,
        { headers:
          {
            'Access-Control-Allow-Origin': '*'

          }
        }
      ).then(response => {
        console.log(response)
      })
        .catch(function (error) {
          console.log(error)
        })
    },

    showModal1: function () {
      this.modalVisible1 = true
      this.modalBgVisible1 = true
    },
    showModal2: function () {
      this.modalVisible2 = true
      this.modalBgVisible2 = true
    },
    hideModal: function () {
      this.modalVisible1 = false
      this.modalBgVisible1 = false
      this.modalVisible2 = false
      this.modalBgVisible2 = false
    },
    searchFiles: function () {
      axios.get('https://testsearch-dot-galvanic-ripsaw-281806.df.r.appspot.com/', {
        params: {
          client_name: this.tableSelected
        }
      }, {
        headers:
          {
            'Access-Control-Allow-Origin': '*'
          }
      }).then(response => {
        var array = response.data
        for (var key in array) {
          var pushNum = array[key]
          this.pushNum.push(pushNum)
        }
      })
    },
    showPopup: function () {
      alert('已上傳')
    },
    getTexts: function () {
      
      axios.get('https://gettexts-dot-galvanic-ripsaw-281806.df.r.appspot.com/', {
        params: {
          client_name:this.tableSelected,
          push_num:this.selectedPushNum
        },
      }).then(response => {
        this.textList = response.data.replace('\r','');
        // console.log(this.textList)
        var split_texts = this.textList.split('\n\n').filter(function(s){return s !== '';});
        var split_n_text = this.textList.split('\n').filter(function(s){return s !== '';});
        // console.log(split_n_text)

        this.flex_text1 = split_texts[split_texts.length-1]
        this.flex_text2 = split_texts[split_texts.length-3]
        this.flexTitleTxt1_1 = split_n_text.slice(6,8).join('\n');
        this.flexTitleTxt1_2 = split_n_text.slice(13,15).join('\n');
        this.flexTitleTxt2_1 = split_n_text.slice(23,25).join('\n');
        this.flexTitleTxt2_2 = split_n_text.slice(30,32).join('\n');
        this.flexContentTxt1_1 = split_n_text.slice(8,10).join('\n');
        this.flexContentTxt1_2 = split_n_text.slice(25,27).join('\n');
        this.flexContentTxt2_1 = split_n_text.slice(18,21).join('\n');
        this.flexContentTxt2_2 = split_n_text.slice(32,34).join('\n');
        this.flexEndTxt1_1 = split_n_text.slice(10,12).join('\n');
        this.flexEndTxt1_2 = split_n_text.slice(17,19).join('\n');
        this.flexEndTxt2_1 = split_n_text.slice(27,29).join('\n');
        this.flexEndTxt2_2 = split_n_text.slice(34,36).join('\n');
        this.flexButtonTxt1_1 = split_n_text.slice(12,13).join('\n');
        this.flexButtonTxt1_2 = split_n_text.slice(19,20).join('\n');
        this.flexButtonTxt2_1 = split_n_text.slice(29,30).join('\n');
        this.flexButtonTxt2_2 = split_n_text.slice(36,37).join('\n');
        this.queryTxt1 = split_n_text.slice(0,1).join('\n');
        this.queryTxt2 = split_n_text.slice(1,2).join('\n');
        this.queryTxt3 = split_n_text.slice(2,3).join('\n');
        this.queryTxt4 = split_n_text.slice(3,4).join('\n');
        this.queryTxt5 = split_n_text.slice(4,5).join('\n');
        this.queryTxt6 = split_n_text.slice(5,6).join('\n');
        this.queryTxt7 = split_n_text.slice(6,7).join('\n');
        this.queryTxt8 = split_n_text.slice(7,8).join('\n');
        this.queryTxt9 = split_n_text.slice(8,9).join('\n');
        this.queryTxt10 = split_n_text.slice(9,10).join('\n');
        this.queryTxt11 = split_n_text.slice(10,11).join('\n');
        this.queryTxt12 = split_n_text.slice(11,12).join('\n');
        this.queryTxt13 = split_n_text.slice(12,13).join('\n');
        this.queryTxt14 = split_n_text.slice(13,14).join('\n');
        this.queryTxt15 = split_n_text.slice(14,15).join('\n');
        this.queryTxt16 = split_n_text.slice(15,16).join('\n');
        this.queryTxt17 = split_n_text.slice(16,17).join('\n');
        this.queryTxt18 = split_n_text.slice(17,18).join('\n');
        this.queryTxt19 = split_n_text.slice(18,19).join('\n');
        this.queryTxt21 = split_n_text.slice(19,20).join('\n');
        this.queryTxt22 = split_n_text.slice(20,21).join('\n');
        this.queryTxt23 = split_n_text.slice(21,22).join('\n');
        this.queryTxt24 = split_n_text.slice(22,23).join('\n');
        this.queryTxt25 = split_n_text.slice(23,24).join('\n');
        this.queryTxt26 = split_n_text.slice(24,25).join('\n');
        this.queryTxt27 = split_n_text.slice(25,26).join('\n');
        this.queryTxt28 = split_n_text.slice(26,27).join('\n');
        this.queryTxt29 = split_n_text.slice(27,28).join('\n');
        this.queryTxt30 = split_n_text.slice(28,29).join('\n');
        this.queryTxt31 = split_n_text.slice(29,30).join('\n');
        this.queryTxt32 = split_n_text.slice(30,31).join('\n');
        this.queryTxt33 = split_n_text.slice(31,32).join('\n');
        this.queryTxt34 = split_n_text.slice(32,33).join('\n');
        this.queryTxt35 = split_n_text.slice(33,34).join('\n');
        this.queryTxt36 = split_n_text.slice(34,35).join('\n');
        this.queryTxt37 = split_n_text.slice(35,36).join('\n');
        this.queryTxt38 = split_n_text.slice(36,37).join('\n');

        var count = 1;
        for (var text in split_texts) {
          var portion = split_texts[text];
          if (count === 1) {
            this.text1 = portion;
            count += 1;
            //console.log(this.text1)
          }else if (count === 2) {
            this.text2 = portion;
            count += 1;
            //console.log(this.text2)
          }else if (count === 3) {
            this.text3 = portion;
            count += 1;
            //console.log(this.text3)
          }else if (count === 4) {
            this.text4 = portion;
            count += 1;
            //console.log(this.text4)
          }else if (count === 5) {
            this.text5 = portion;
            count += 1;
            //console.log(this.text5)
          }else if (count === 6) {
            this.text6 = portion;
            count += 1;
            //console.log(this.text6)
          }else if (count === 7) {
            this.text7 = portion;
            count += 1;
            //console.log(this.text7)
          }else if (count === 8) {
            this.text8 = portion;
            count += 1;
            //console.log(this.text8)
          }else if (count === 9) {
            this.text9 = portion;
            count += 1;
            //console.log(this.text9)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.header-top {
  position: absolute;
  right: 43%;
}
h3 {
  text-align:center
}
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
.content-sec2 {
  border: 5px ridge gray;
  height: 50px;
  text-align: center;
  font-weight: bold;
}
.content-sec4 {
  top: -100px;
  left: 45px;
  background-color: lightgray;
  height: 200px;
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
.content-sec5 {
  top: -180px;
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
  top: -280px;
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
.table-sel {
  border: 5px ridge gray;
  text-align: center;
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
.btn2{
  right: 35%;
  width: 100px;
  background-color: aquamarine;
  position: absolute;
  top:55%;
  height: 50px;
  border-radius: 6px;
}
.selected-section {
  position: relative;
  top: 23%;
}
.text-field1 {
  position:absolute;
  left: 38%;
  top: 230px;
  height: 12%;
  width: 25%;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #eeeeee);
  background: -webkit-linear-gradient(top, #ffffff, #eeeeee);
  border: 1px solid #eeeeee;
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 1) inset;
  white-space: pre;
}
.text-field2 {
  position:absolute;
  left: 28%;
  top: 400px;
  height: 12%;
  width: 20%;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #eeeeee);/*背景色*/
  background: -webkit-linear-gradient(top, #ffffff, #eeeeee);/*背景色*/
  border: 1px solid #eeeeee;/*枠線*/
  box-shadow:0 -1px 0 rgba(255, 255, 255, 1) inset;
  white-space: pre;
}
.text-field3 {
  position:absolute;
  left: 52%;
  top: 400px;
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
.text-field4 {
  position:absolute;
  left: 28%;
  top: 580px;
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
.text-field5 {
  position:absolute;
  left: 52%;
  top: 580px;
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
.text-field6 {
  position:absolute;
  left: 28%;
  top: 800px;
  height: 24%;
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
.text-field7 {
  position:absolute;
  left: 52%;
  top: 800px;
  height: 24%;
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
.text-field8 {
  position:absolute;
  left: 28%;
  top: 1100px;
  height: 24%;
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
.text-field9 {
  position:absolute;
  left: 52%;
  top: 1100px;
  height: 24%;
  width: 20%;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #ffffff, #eeeeee);/*背景色*/
  background: -webkit-linear-gradient(top, #ffffff,#eeeeee);/*背景色*/
  border: 1px solid #eeeeee;/*枠線*/
  box-shadow: 0 -1px 0 rgba(255, 255, 255, 1) inset;
  white-space:pre;
}
.flex-sec1{
  position: relative;
  left: 460%;
  top: -1360px;
  background-color: lightgray;
  height: 350px;
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
.flex-sec2{
  position: relative;
  left: 460%;
  top: -1450px;
  background-color: lightgray;
  height: 350px;
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
.modal-header, .modal-body {
  padding: 5px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
.l-modal__bg {
width: 100%;
height: 200%;
background: rgba(89, 89, 89, 0.6);
position: fixed;
top: 0;
left: 0;
}
.l-modal {
position: absolute;
top: -100%;
left: 0;
width: 100%;
height: 100%;
z-index: 99;
white-space: pre-line;
}
/*
.p-modal {
width:300px;
height: 450px;
background: #fff;
border-radius: 3px;
padding: 10px 25px;
box-sizing: border-box;
position: relative;
top: 150%;
left: 50%;
text-align:center;
-webkit-transform : translate(-50%,-50%);
transform : translate(-50%,-50%);
}
*/
.p-modal__btn {
font-size: 36px;
position: absolute;
top: 0px;
right: 20px;
outline: none;
border-radius: 9px;
border: none;
display: block;
left: 1%;
width:295px;
height:70px;
top:62%;
margin: 100px auto;
box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 2px 3px -2px rgba(0, 0, 0, 0.15);
font-size: 16px;
transition: .5s;
}
.p-modal__btn:hover{
cursor: pointer;
}
.flex-btn {
  position: absolute;
  width: 20%;
  height: 10%;
  left: 40%;
  bottom:22%;
  border-radius: 70px;
}
.upload-btn {
  position: absolute;
  width: 15%;
  height: 10%;
  left: 6%;
  top:150%;
  border-radius: 4px;
  background-color: lightskyblue;
  border-radius: 3px;
  color:#ffffff;
}
.setting-btn {
  position: absolute;
  width: 100px;
  background-color: lightskyblue;
  height: 54px;
  border-radius: 3px;
  left: 120px;
  bottom:4px;
}
.input-img-field {
  display: none;
}
.img-field-container {
  height: 50px;
  width: 120px;
  top: 70%;
  left: 33%;
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
.modalDetail-btn {
  position: absolute;
  bottom: 5px;
  left: 5px;
  width: 100px;
  height: 50px;
  background-color: lightskyblue;
}
.preview-btn {
  right: 63%;
  height: 55px;
  width: 100px;
  background-color: aquamarine;
  position: absolute;
  top:83%;
  border-radius: 5px;
}
.img-container {
  height: 100%;
}
.img-sec {
  width: 100%;
  height: 40%;
  object-fit: cover;
  border: solid 2px #d27d00;/*線色*/
}
.modalStyle1 {
  width:300px;
  height:450px;
  background: #fff;
  border-radius:3px;
  padding:10px 25px;
  box-sizing:border-box;
  position:relative;
  top:150%;
  left:38%;
  text-align:center;
  --webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
}
.modalStyle2 {
  width:300px;
  height:450px;
  background: #fff;
  border-radius:3px;
  padding:10px 25px;
  box-sizing:border-box;
  position:relative;
  top:93%;
  left:65%;
  text-align:center;
  --webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
}
.modal-container {
  width:300px;
  height:450px;
  background: #fff;
  border-radius:3px;
  padding:10px 25px;
  box-sizing:border-box;
  position:relative;
  top:93%;
  left:69%;
  text-align:center;
  --webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
}
.l-modal-body {
  position: absolute;
  top: 10%;
  left: 25%;
  width: 50%;
  height: 80%;
  z-index: 999;
  border-radius: 7px;
  background-color: white;
  white-space: pre-line;
  border: 1px solid black;
}
.modal-sec1 {
  border: 2px solid gray;
  margin-top: 3px;
  width: 49%;
  height: 75%;
  position: absolute;
  margin-left: 3px;
  margin-bottom: 3px;
}
.modal-sec2 {
  border: 2px solid gray;
  margin-top: 3px;
  width: 49%;
  left: 50%;
  height: 75%;
  position: absolute;
  margin-left: 3px;
  margin-bottom: 3px;
}
.inputImg-sec {
  width: 100px;
}
.img-wrapper1 {
  position: absolute;
  top: 12%;
  height: 90%;
  left: 12%;
  width:70%;
}
.input-link-field {
  position: absolute;
  top: 55%;
  left: 13%;
  height: 40px;
  width: 70%;
  border: 2px solid gray;
  border-radius: 5px;
}
.link-title-field{
  position: absolute;
  top: 50%;
  left: 13%;
}
.btn-title {
  position: absolute;
  margin-left: 13%;
  top: 10px
}
.node-lv1 {
  position: absolute;
  top: 200px;
  left: 30%;
  color: gray;
}
.node-lv2 {
  position: absolute;
  top: 360px;
  left: 30%;
  color: gray;
}
.node-lv3 {
  position: absolute;
  top: 540px;
  left: 30%;
  color: gray;
}
.node-lv4 {
  position: absolute;
  top: 765px;
  left: 30%;
  color: gray;
}
.node-lv5 {
  position: absolute;
  top: 1030px;
  left: 30%;
  color: gray;
}
.keyword-input-filed {
  border: 2px solid gray;
}
.tagField_lv1 {
  position: absolute;
  top: 200px;
  left: 41%;
  color: gray;
  border: 4px solid gray;
  border-radius: 3px;
}
.tag-title1 {
  position: absolute;
  top: 200px;
  left: 35%;
  color: gray;
}
.tagField_lv2 {
  position: absolute;
  top: 540px;
  left: 41%;
  color: gray;
  border: 2px splid gray;
  border-radius: 3px;
}
.tag-title2 {
  position: absolute;
  top: 540px;
  left: 35%;
  color: gray;
}
.tag-title3 {
  position: absolute;
  top: 765px;
  left: 39%;
  color: gray;
}
.tagField_lv3 {
  position: absolute;
  top: 765px;
  left: 45%;
  color: gray;
  border: 2px splid gray;
  border-radius: 3px;
}
.tag-title4 {
  position: absolute;
  top: 1030px;
  left: 39%;
  color: gray;
}
.tagField_lv4 {
  position: absolute;
  top: 1030px;
  left: 45%;
  color: gray;
  border: 2px splid gray;
  border-radius: 3px;
}
input[type="text"] {
  border: 1px solid #999;
}
input[type="text"]:focus {
  border: 1px solid #ff9900;
  outline: 0;
}
</style>