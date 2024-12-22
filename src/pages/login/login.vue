<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { useToast } from 'wot-design-uni'
import { getCodeApi, getVerifyApi, getPhonApi, getKeyApi, getKeyCodeApi, getStatusApi } from '../../serviceDiscover'

interface FormData {
    phon: string
    code: string

}
const toast = useToast()
const flag = ref(false)
const show = ref(false)
const formRef = ref()
const initform= ref({
    phon: '',
    code: '',
})
const form = ref<FormData>({...initform.value})
const rules = reactive({
    phon: [
        {
          required: false,
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确号码'
        }
      ],
      code: [
        {
          required: true,
          message: '请输入验证码'
        }
      ]
})


const getCode = async (phon:string) => {
    console.log(phon)
    try{
        toast.loading('加载中...')
        flag.value = true
        toast.show('验证码发送中')
        console.log('发送验证码')
        const res = await getCodeApi(phon)
    }catch(e){
        console.log(e)
    }finally{
        flag.value = false
        toast.close()
    }
}

const getPhon = async(phon:string, captcha: string) =>{
  try{
    const res = await getPhonApi(phon, captcha)
    console.log(res)
    if(res.code === 200){
      console.log(res)
      uni.switchTab({
          url: '/pages/discover/discover'
      })
    }else{
      toast.error(res.message)
    }
  }catch(e){
    console.log(e)
  }
}

const getVerify = async (phon:string, captcha: string) => {
    try{
        const res = await getVerifyApi(phon, captcha)
        console.log(res)
        if(res.code === 200){
          toast.success('验证成功')
          getPhon(phon, captcha)
        }else{
          toast.error(res.message)
          console.log()
        }
    }catch(e){
        console.log(e)
    }
}


const submit = () => {
    formRef.value?.validate()
        .then((valid: boolean) => {
          if (valid) {
            getVerify(form.value.phon, form.value.code)
          } 
        })
        .catch((error:any) => {
          console.log(error, 'error')
        })
}

const keyCode = ref()
let timer = null
const getStatus = async (key:string) => {
  try{
    const res = await getStatusApi(key)
    console.log(res)
    if(res.code === 803){
      clearInterval(timer)
      toast.success('登录成功')
      document.cookie = `token=${res.cookie}`
      uni.switchTab({
        url: '/pages/discover/discover'
      })
    }else{
      toast.error(res.message)
    }
  }catch(e){
    console.log(e)
  }
}
const getKeyCode = async (key:string) => {
  try{
    toast.loading('加载中...')
    const res = await getKeyCodeApi(key)
    console.log(res)
    keyCode.value = res.data.qrimg
    if(res.code === 200){
      timer=setInterval(()=>{
        getStatus(key)
      },15000)
    }else{
      toast.error('获取key失败')
    }
  }catch(e){
    console.log(e)
  }finally{
    toast.close()
  }
}
const getKey = async () => {
  show.value = true
  try{
    const res = await getKeyApi()
    if(res.code === 200){
      console.log(res)
      getKeyCode(res.data.unikey)
    }else{
      toast.error('获取key失败')
    }
  }catch(e){
    console.log(e)
  }
}
</script>

<template>
  <view class="box">
    <image src="../../static/网易云音乐.png" mode="widthFix"/>
    <wd-form ref="formRef" :model="form" :rules="rules">
    <wd-cell-group border>
        <wd-input
        label="+86"
        label-width="100px"
        prop="phon"
        clearable
        v-model="form.phon"
        placeholder="请输入手机号"
        
        />
        <wd-input
        label="验证码"
        label-width="100px"
        prop="code"
        clearable
        v-model="form.code"
        placeholder="请输入验证码"
        />
        <wd-button :loading="flag" type="info" :disabled="flag" @click="getCode(form.phon)">获取验证码</wd-button>
    </wd-cell-group>
    <view class="footer">
        <wd-button type="error" size="large" @click="submit" block>一键登录</wd-button>
    </view>
    </wd-form>
    <wd-button size="small" plain hairline @click="getKey">扫描二维码登录</wd-button>
    <wd-toast />
    <view class="bg" v-if="show" @click="show=!show">
      <view class="keyBox">
        <image class="KeyImg" :src="keyCode" width="widthFix"/>
        <view class="codeTxt">扫描二维码</view>
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
.box{
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #fde4d0 0%, #fff 50%);
  padding: 100px 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  image{
    width: 150px;
    // margin-left: 70px;
    margin-bottom: 80rpx;
  }
}
.getcCode{
    font-size: 14px;
    margin-bottom: 10px;
    margin-left: 15px;
    color: rgb(92, 141, 255);
    &:active{
        text-decoration: underline;
    }
}
.footer{
  margin: 10px 0;
}
.bg{
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.keyBox{
  width: 180px;
  height: 200px;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  margin-top: -60px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.KeyImg{
  width: 100%;
  height: 80%;
  margin-bottom: 10px;
}
.codeText{
  font-size: 13px;
  color: #ddd;
}
</style>