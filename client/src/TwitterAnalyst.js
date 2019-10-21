import React from 'react';
import {getWords,getHashtags,getNames,getAvgTweetPerSecond} from "./communication.js"
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  Table,
  Row,
  Col
} from "reactstrap";

const INTERVAL_FETCH_DATA = 100;
class TwitterAnalyst extends React.Component
{
  initialState = {
    topNames:[],
    topWords:[],
    topHashtags:[],
    namesFilter:"",
    wordsFilter:"",
    hashtagsFilter:"",
    avgTweet:0
  }
  namesIcon = "tim-icons icon-badge text-danger";
  hashtagsIcon =  "tim-icons icon-tag text-success";
  wordsIcon = "tim-icons icon-pencil text-primary";

 constructor(props){
    super(props);
    this.state = this.initialState;
    this.bindFunctions = this.bindFunctions.bind(this);
    this.bindFunctions();
    setImmediate(this.fetchData)
    setInterval(this.fetchData,INTERVAL_FETCH_DATA)
  }

 bindFunctions(){
    this.getNames = this.getNames.bind(this);
    this.getHashtags = this.getHashtags.bind(this);
    this.getWords  = this.getWords.bind(this);
    this.getAvgTweetPerSecond = this.getAvgTweetPerSecond.bind(this);
    this.callBackGetNames = this.callBackGetNames.bind(this);
    this.callBackGetHashtags = this.callBackGetHashtags.bind(this);
    this.callBackGetWords  = this.callBackGetWords.bind(this);
    this.callBackGetAvgTweetPerSecond = this.callBackGetAvgTweetPerSecond.bind(this);
    this.onChangeNameFilter = this.onChangeNameFilter.bind(this);
    this.onChangeWordsFilter = this.onChangeWordsFilter.bind(this);
    this.onChangeHashtagsFilter = this.onChangeHashtagsFilter.bind(this);
    this.getAvgTweetPanel = this.getAvgTweetPanel.bind(this)
    this.fetchData = this.fetchData.bind(this);
    this.getDataView = this.getDataView.bind(this);
  }

 fetchData(){
    this.getWords();
    this.getNames();
    this.getHashtags();
    this.getAvgTweetPerSecond();
}

 getTableRow(row){
    if(typeof row === "undefined"){
    row = {key:"",value:""}
  }
    return(
    <tr>
      <td>{row.key}</td>
      <td className = "text-center">{row.value}</td>
    </tr>
  )
  }

 getTable(data,filter){
    return(
      <Table className = "tablesorter" >
        <tbody>{
          data.map((obj,i) => {
            if(obj.key.indexOf(filter) !== -1)
            {
              return this.getTableRow(obj)
            }
          })
        }
        </tbody>
      </Table>
    )}

 callBackGetAvgTweetPerSecond(data){
    this.setState({avgTweet:Math.round(Number(data))})
  }

 callBackGetNames(data){
   this.setState({topNames:data})
  }

 callBackGetWords(data){
   this.setState({topWords:data})
  }

 callBackGetHashtags(data){
  this.setState({topHashtags:data})
  }

 getAvgTweetPerSecond(){
   getAvgTweetPerSecond(this.callBackGetAvgTweetPerSecond);
 }

 getNames(){
  getNames(this.callBackGetNames);
}

 getWords(){
   getWords(this.callBackGetWords);
}

 getHashtags(){
  getHashtags(this.callBackGetHashtags);
}

 onChangeNameFilter(event){
    const value = event.target.value;
    this.setState({namesFilter:value});
  }

 onChangeWordsFilter(event){
    const value = event.target.value;
    this.setState({wordsFilter:value});
  }

 onChangeHashtagsFilter(event){
    const value = event.target.value;
    this.setState({hashtagsFilter:value});
  }

 getRefreshButton(onClickRefresh){
    return (
      <Col sm = "6" className = "float-right">
        <ButtonGroup
          className = "btn-group-toggle float-right"
          data-toggle = "buttons">
          <Button
            color = "info"
            id = "1"
            size = "sm"
            tag = "label"
            onClick = {() =>{onClickRefresh()}}>
              <input className = "d-none" name = "options" type = "radio" />
              <span className =
                "d-none d-sm-block d-md-block d-lg-block d-xl-block">
              <i className = "tim-icons icon-refresh-02" />
            </span>
          </Button>
        </ButtonGroup>
      </Col>
    )
  }

 getAvgTweetPanel(){
    return(
      <Col lg = "12" sm = "12" md = {{ size: 6, offset: 0 }}>
        <Card className = "card-chart">
          <CardHeader>
            <CardTitle tag = "h2" style = {{textAlign: "left"}}>
            <Row>
            <Col>
              <i className = "tim-icons icon-bell-55 text-info " />{" "}
              <span style = {{display: "inline-block"}}>
                Avg Tweet
              </span>
            </Col>
              <Col>
             {this.getRefreshButton(this.getAvgTweetPerSecond)}
             </Col>
            </Row>
            </CardTitle>
          </CardHeader>
          <CardBody tag = "h3" style = {{textAlign: "center"}}>
          <span style = {{display: "inline-block"}}>
          {this.state.avgTweet}
          </span>
          </CardBody>
        </Card>
      </Col>
    )
  }

 getDataCard(data){

    return(<Card className = "card-chart">
      <CardHeader>
        <CardTitle tag = "h3">
          <i className = {data.icon} />{" "}
          {data.title}
          {this.getRefreshButton(data.onRefreshData)}
        </CardTitle>
      </CardHeader>
      <CardBody>
      <Input type = "text" onChange = {(event) => data.onChangeFilter(event)}
          placeholder = {data.filterPlaceHolder} />
      {this.getTable(data.data,data.filter)}
      </CardBody>
    </Card>)
  }

 getDataView(){
    const {onChangeNameFilter,onChangeWordsFilter,
                onChangeHashtagsFilter,getHashtags,
                    getNames,getWords,hashtagsIcon,wordsIcon,namesIcon} = this;
    const {topWords,topNames,topHashtags,
      namesFilter,wordsFilter,hashtagsFilter} = this.state;
    return(
      {
        "Names":{
          title:"Names",
          icon:namesIcon,
          onRefreshData:getNames,
          data:topNames,
          filter:namesFilter,
          onChangeFilter:onChangeNameFilter,
          filterPlaceHolder: "Name filter"},
        "Words":{
          title:"Words",
          icon:wordsIcon,
          onRefreshData:getWords,
          data:topWords,
          filter:wordsFilter,
          onChangeFilter:onChangeWordsFilter,
          filterPlaceHolder: "Words filter"},
        "Hashtags":{
          title:"Hashtags",
          icon:hashtagsIcon,
          onRefreshData:getHashtags,
          data:topHashtags,
          filter:hashtagsFilter,
          onChangeFilter:onChangeHashtagsFilter,
          filterPlaceHolder: "Hashtags filter"}
        })
  }

 render(){
    const dataView = this.getDataView();
    const dataViewKeys  = Object.keys(dataView)
    return (
      <div className = "content">
            <Row>
            {this.getAvgTweetPanel()}
            </Row>
            <Row>
            {dataViewKeys.map((obj,i)=>{
              return (
                <Col lg = "4">
                  {
                    this.getDataCard(dataView[obj])
                  }
                </Col>)
            })}
            </Row>
          </div>
        )}
}
export default TwitterAnalyst;
