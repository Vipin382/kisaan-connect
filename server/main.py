from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from ai4bharat.transliteration import XlitEngine
import nltk
nltk.download('punkt')


def tokenize(full_name):
  tokens=nltk.word_tokenize(full_name)
  print(tokens)

def transliterate(l_token,top=3, lang='hi'):
  e = XlitEngine(src_script_type='indic', beam_width=4, rescore=True)
  trans_word = e.translit_word(l_token, lang_code=lang, topk=top)
  return trans_word

def nameMatch(a_token,l_token_topk):
  res=[]
  for l_token in l_token_topk:
    if a_token[0]!=l_token[0]:
      # print(a_token[0], l_token[0])
      res.append(0)
    else:
      res.append(fuzz.ratio(a_token, l_token))

  return max(res)

def fullFuzzy(a_tokens, l_tokens_topk):
  fuzzyOfFullName=[]
  for a_token in a_tokens:
    fuzzyValue=[]
    for l_token_topk in l_tokens_topk:
      fuzzyValue.append(nameMatch(a_token, l_token_topk))
    fuzzyOfFullName.append(max(fuzzyValue))
  return fuzzyOfFullName


def result(fuzzyOfFullName):
  wordsFullyMatched=0
  for value in fuzzyOfFullName:
    if value==100:
      wordsFullyMatched = wordsFullyMatched + 1
  fuzzyScore = sum(fuzzyOfFullName) / len(fuzzyOfFullName)

  if wordsFullyMatched == 3:
    return "Approved"
  elif wordsFullyMatched == 2 and fuzzyScore > 90:
     return "Approved"
  elif wordsFullyMatched > 0 or fuzzyScore > 60:
    return "Doubtful"
  else:
    return "Rejected"


def mainFun(aname, lname):
  aname = aname.lower()
  a_tokens= (nltk.word_tokenize(aname))
  l_tokens = nltk.word_tokenize(lname)
  l_tokens_topk = []
  for l_token in l_tokens:
    l_tokens_topk.append(transliterate(l_token))

  fuzzyOfFullName = fullFuzzy(a_tokens, l_tokens_topk)
  status = result(fuzzyOfFullName)
  return status


##Api code
from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from twilio.rest import Client
from pydantic import BaseModel
import random
import json;

app = FastAPI()

## twilio api
account_sid = 'AC8f59d6a794f56100e7823c4c5b34a163'
auth_token = 'bed2845c76548fcc2d33c9e19544ec47'
client = Client(account_sid, auth_token)


class Item(BaseModel):
    aadhaar: str

class ULPIN(BaseModel):
    num: str
    aadhaar: str

origins = [
    "*",
]

## aadhaar data
aadhar_info = []
with open("./user.json", "r",encoding="utf-8") as file:
    aadhar_info = json.load(file)["data"]


##ulpin Database 
ULPIN_info = []
with open("./ULPIN.json", "r",encoding="utf-8") as file:
    ULPIN_info = json.load(file)["data"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def sendOtp(num):
    otp = str(random.randrange(1000,9999))
    message = client.messages.create(
                from_='+18147524364',
                body='Your One Time Password id : '+ otp,
                to='+91'+num
            )
    print(message)
    return otp


@app.get("/")
def read_root():
    return {"Hello": "World"}

def FindCandidate(aadhaar_num):
    for x in aadhar_info:
        if x['aadhaar']==aadhaar_num:
            return x['phone']

    return False

def FindName(aadhaar_num):
    for x in aadhar_info:
        if x['aadhaar']==aadhaar_num:
            return x['name']

    return False

def VerifyPIN(ULNUM):
    for x in ULPIN_info:
        if x['ULPIN']==ULNUM:
            return x['name']

    return False


@app.post("/verify")
def read_item( item: Item):
    msg =  FindCandidate(item.aadhaar)
    print(msg)
    if msg!=False:
        return sendOtp(msg)
    else:
        return "You are not elegible"


@app.post("/verifyPin")
def read_item( item: ULPIN):
   name = VerifyPIN(item.num)
   aadhar_name = FindName(item.aadhaar)
   if aadhar_name and name:
      result = mainFun(str(aadhar_name),str(name))
      return result
   return False




    
