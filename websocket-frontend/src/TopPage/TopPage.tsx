import { Link } from 'react-router-dom'

import * as Presenter from './Presenter'

const TOP_LINK = [
  { to: '/unit', text: '単体でのソケット通信サンプル' },
  // チャットの方は工事中
  // { to: '/chat', text: 'チャット形式でのソケットサンプル' },
] as const

const TopPage: React.FC = () => (
  <Presenter.TopPage>
    {TOP_LINK.map(link => (
      <Presenter.Link key={link.to}>
        <Link to={link.to}>{link.text}</Link>
      </Presenter.Link>
    ))}
  </Presenter.TopPage>
)
export default TopPage
