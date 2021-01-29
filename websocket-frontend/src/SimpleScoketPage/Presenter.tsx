import styled from 'styled-components'
import {
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import Header from '../compontns/Header'

const StyledContents = styled.ul`
  padding: 40px 10% 120px;
`
const StyledRow = styled.div`
  padding: 20px 0;
`
type SimpleScoketPageProps = {
  fetchData: FetchDataProps
  websocketData: WebSocketDataProps
}
export const SimpleSocketPage: React.FC<SimpleScoketPageProps> = (
  { fetchData, websocketData }
) => (
  <div>
    <Header title={'単体ソケット通信のサンプル'} />
    <StyledContents>
      <StyledRow>
        <Typography variant="body1">
          以下のように動作します<br />
          <ul>
            <li>APIリクエストをすると「REST API Hello 「送信したメッセージ」!」が表示されます</li>
            <li>APIリクエストを契機に3回サーバから通知がプッシュされます</li>
            <li>コネクション接続・切断を押すと接続時は切断、切断時は再接続されます</li>
            <li>useEffectのreturnで切断処理を行っています。ページを離れると（ヘッダーの文字を押してもらえると・・・）コネクションが切れます</li>
            <li>コネクション接続時にはコネクションのIDが表示されます</li>
            <li>コネクションの状態は常に表示されます</li>
            <li>
              WebSocketリクエストを押すとブラウザからAPIリクエストのメッセージをサーバーにWebScoketでデータを送り、レスポンスを受信します。
            </li>
          </ul>
          <br />
          
        </Typography>
      </StyledRow>
      <FetchData {...fetchData} />
      <WebScoketData {...websocketData} />
    </StyledContents>
  </div>
)

const StyledTextField = styled(TextField)`
  width: 250px;
  margin-right: 20px;
`
type InputProps = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Input: React.FC<InputProps> = ({ value, onChange }) => (
  <StyledTextField
    value={value}
    label={'リクエストするメッセージ'} 
    variant="outlined"
    onChange={onChange}
  />
)
type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const FetchButton: React.FC<ButtonProps> = ({ onClick, children }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
  >
    {children}
  </Button>
)
const StyledFetchActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`
const StyledFetchTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`
const StyledResponseWrapper = styled.div`
  padding: 0 20px;
`
const StyledDataContainer = styled.fieldset`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
`
type FetchDataProps = InputProps & ButtonProps & {
  message: string
}
const FetchData: React.FC<FetchDataProps> = (props) => (
  <StyledDataContainer>
    <legend>
      <Typography variant="h6">
        REST API
      </Typography>
    </legend>
    <StyledFetchActionContainer>
      <Input value={props.value} onChange={props.onChange} />
      <FetchButton onClick={props.onClick}>{'APIリクエスト'}</FetchButton>
    </StyledFetchActionContainer>
    <StyledFetchTextContainer>
      <Typography variant="body1">
        APIのレスポンスのメッセージはコチラ
      </Typography>
      <StyledResponseWrapper>
        <Typography variant="h6" color="secondary">{props.message}</Typography>
      </StyledResponseWrapper>
    </StyledFetchTextContainer>
  </StyledDataContainer>
)

const ConnectionButton: React.FC<ButtonProps> = ({ onClick }) => (
  <div>
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      コネクション接続・切断
    </Button>
  </div>
)
const StyledStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
`
type StatusProps = {
  status: string
  count: number
  id: string
}
const StatusText: React.FC<StatusProps> = ({ status, count, id }) => (
  <StyledStatusContainer>
    <Typography variant="h6">
      コネクションのステータス：{status}、
    </Typography>
    <StyledResponseWrapper>
      <ul>
        <li>
          <Typography variant="body1" color="textPrimary">
            WebScoketでのサーバ側からのメッセージ受信回数{count}回
          </Typography>
        </li>
        <li>
          <Typography variant="body1" color="textPrimary">
            サーバとのコネクションのIDは{id}
          </Typography>
        </li>
      </ul>
    </StyledResponseWrapper>
  </StyledStatusContainer>
)
const FailText: React.FC = ({ children }) => (
  <Typography variant="h6" color="error">
    現在、{children}回コネクションの確立に失敗しています。３回失敗するとコネクションが切断されます。
  </Typography>
)


const StyledWebscoketDataContainer = styled(StyledDataContainer)`
  margin-top: 40px;
`
const StyledWebScoketRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`
type WebSocketDataProps = ButtonProps & StatusProps & {
  message: string
  failCount: number
  onClickSender: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const WebScoketData: React.FC<WebSocketDataProps> = (props) => (
  <StyledWebscoketDataContainer>
    <legend>
      <Typography variant="h6">
        WebSocket
      </Typography>
    </legend>
    <StyledWebScoketRowContainer>
      <ConnectionButton onClick={props.onClick} />
    </StyledWebScoketRowContainer>
    <StyledWebScoketRowContainer>
      <FetchButton onClick={props.onClickSender}>
        WebSocketリクエスト
      </FetchButton>
    </StyledWebScoketRowContainer>
    <StyledFetchTextContainer>
      <Typography variant="body1">
        WebScoketのレスポンスのメッセージはコチラ
      </Typography>
      <StyledResponseWrapper>
        <Typography variant="h6" color="secondary">{props.message}</Typography>
      </StyledResponseWrapper>
    </StyledFetchTextContainer>
    <StyledFetchTextContainer>
      <StatusText status={props.status} count={props.count} id={props.id} />
    </StyledFetchTextContainer>
    <StyledFetchTextContainer>
      <FailText>{props.failCount}</FailText>
    </StyledFetchTextContainer>
  </StyledWebscoketDataContainer>
)
