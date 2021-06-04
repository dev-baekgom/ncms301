const Timetable = require('comcigan-parser');
var express = require('express');

const timetable = new Timetable();

const schoolFinder = (schoolName, region) => (schoolList) => {
  const targetSchool = schoolList.find((school) => {
    return school.region === region && school.name.includes(schoolName);
  });
  return targetSchool;
};

function zoom_by_t(teacher){
  if(teacher == '박주'){
    return '<a href="https://bit.ly/34KGWh5">https://bit.ly/34KGWh5</a>, 비번 1446';
  }
  else if(teacher == '화가'){
    return '<a href="https://bit.ly/3g5V9KF">https://bit.ly/3g5V9KF</a>, 비번 1005';
  }
  else if(teacher == '이다'){
    return '<a href="https://bit.ly/3yYIiTl">https://bit.ly/3yYIiTl</a>';
  }
  else if(teacher == '이선'){
    return '<a href="https://bit.ly/3wTTajj">https://bit.ly/3wTTajj</a>, 비번 1005';
  }
  else if(teacher == '유호'){
    return '<a href="https://bit.ly/3cgGknn">https://bit.ly/3cgGknn</a>, 비번 018777';
  }
  else if(teacher == '이민'){
    return '<a href="https://bit.ly/3fQKBQW">https://bit.ly/3fQKBQW</a>, 비번 2020';
  }
  else if(teacher == '김성'){
    return '<a href="https://bit.ly/3gbq9J8">https://bit.ly/3gbq9J8</a>, 비번 1234';
  }
  else if(teacher == '임혜'){
    return '<a href="https://bit.ly/34KgPXt">https://bit.ly/34KgPXt</a>, 비번 6DZycV';
  }
  else if(teacher == '박혜'){
    return '<a href="https://bit.ly/3wUP76n">https://bit.ly/3wUP76n</a>, 비번 6245310';
  }
  else if(teacher == '송민'){
    return '<a href="https://bit.ly/3wSJvJW">https://bit.ly/3wSJvJW</a>, 비번 0000';
  }
  else if(teacher == '주한'){
    return '<a href="https://bit.ly/3fMD4Cn">https://bit.ly/3fMD4Cn</a>, 비번 iK6wgX';
  }
  else if(teacher == '김세'){
    return '<a href="https://bit.ly/3vRqCai">https://bit.ly/3vRqCai</a>, 비번 2020';
  }
  else if(teacher == '배서'){
    return '<a href="https://bit.ly/34ZcQGV">https://bit.ly/34ZcQGV</a>0';
  }
  else if(teacher == '이태'){
    return '<a href="https://bit.ly/3uQWz0S">https://bit.ly/3uQWz0S</a>, 비번 1234';
  }
  else if(teacher == '김보'){
    return '<a href="https://bit.ly/3uPzbBd">https://bit.ly/3uPzbBd</a>, 비번 4gVVbj';
  }
  else if(teacher == '석진'){
    return '<a href="https://bit.ly/3igvKk8">https://bit.ly/3igvKk8</a>, 비번 1234';
  }
  else if(teacher == '전규'){
    return '<a href="https://bit.ly/3uQcgp2">https://bit.ly/3uQcgp2</a>';
  }
  else{
    return '정보 없음';
  }
}

function zoom_by_s(subject){
  if(subject == '창특'){
    return '<a href="https://bit.ly/3g9Nz1E">https://bit.ly/3g9Nz1E</a>, 비번 9696'
  }
  else{
    return '정보 없음';
  }
}

var app = express();

app.get('/', function(req, res) {
  timetable
  .init()
  .then(() => timetable.search('남천'))
  .then(schoolFinder('남천중학교', '부산'))
  .then((school) => timetable.setSchool(school.code))
  .then(() => {
    Promise.all([timetable.getClassTime(), timetable.getTimetable()]).then((result) => {
      var date = new Date();
      var day = date.getDay();
      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      var ct = result[0];
      var tt = result[1][3][1][day - 1];
      var source = ''
      source += '<!DOCTYPE html>\n<html>\n   <head>\n       <title>다음시간 머더라<\/title>\n   <\/head>\n   <body>\n        <table>\n        \t<caption>\n            \t3-1반 시간표 - ' + utc +'\n            <\/caption>\n            <thead>\n            \t<tr>\n                    <th>교시<\/th>\n                    <th>과목<\/th>\n                    <th>선생님<\/th>\n                    <th>줌 링크<\/th>\n                 <\/tr>\n            <\/thead>\n            <tbody>';
      for(var i = 0; tt[i].subject != ''; i++){
        if(tt[i].teacher != null){
          source += '\n               <tr>\n                  <td>' + ct[i] + '</td>\n                  <td>' + tt[i].subject + '</td>\n                  <td>' + tt[i].teacher + '*</td>\n                  <td>' + zoom_by_t(tt[i].teacher) + '</td>\n               </tr>';
        }
        else{
          source += '\n               <tr>\n                  <td>' + ct[i] + '</td>\n                  <td>' + tt[i].subject + '</td>\n                  <td></td>\n                  <td>' +  zoom_by_s(tt[i].subject) + '</td>\n               </tr>';
        }
      }
      source += '\n            <\/tbody>\n        <\/table>\n        <style>\n            @import url("https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap");\n            *, *:before, *:after {\n              -moz-box-sizing: border-box;\n              -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n            }\n            \n            body {\n              font-family: \'Black Han Sans\', sans-serif;\n              color: #333;\n              font-weight: 400;\n              font-size: 16px;\n            }\n            \n            table {\n              max-width: 960px;\n              margin: 80px auto;\n            }\n            \n            caption {\n              font-size: 18px;\n              font-weight: 400;\n              padding: 12px 0;\n            }\n            \n            thead th {\n              background: #0c3390;\n              color: #fff;\n              font-weight: initial;\n            }\n            \n            tr { background: #f1f1f1; }\n            \n            tr:nth-child(2n) { background: #e0e0e0; }\n            \n            th, td {\n              text-align: left;\n              padding: 24px;\n            }\n            \n            tfoot tr { background: none; }\n            \n            tfoot td {\n              padding: 12px 2px;\n              font-style: italic;\n              color: #8a97a0;\n            }\n        <\/style>\n\t<\/body>\n<\/html>';
      res.send(source);
    });
  });
});

var port = process.env.PORT; //테스트시 수정!
app.listen(port, function(){
  console.log('server on');
});