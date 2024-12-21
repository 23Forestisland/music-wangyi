<script lang='ts' setup >
import { ref, reactive} from 'vue'
import { useToast } from 'wot-design-uni'
import { getCodeApi, getVerifyApi } from '../../serviceDiscover'

interface FormData {
    phon: string
    code: string

}
const toast = useToast()
const flag = ref(false)

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

const getVerify = async (phon:string, captcha: string) => {
    try{
        const res = await getVerifyApi(phon, captcha)
        console.log(res)
        if(res.code === 200){
          toast.success('登录成功')
          uni.switchTab({
              url: '/pages/discover/discover'
          })
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

    <wd-toast />
  </view>
</template>

<style lang='scss' scoped>
.box{
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #fde4d0 0%, #fff 50%);
  padding: 100px 40px 0;
  image{
    width: 150px;
    margin-left: 70px;
    margin-bottom: 12rpx;
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

</style>