import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page not-found">
      <div className="not-found-inner">
        <span className="not-found-icon">♪</span>
        <h1>404</h1>
        <p>Страница не найдена. Возможно, трек закончился.</p>
        <Link to="/" className="btn btn-primary">На главную</Link>
      </div>
    </div>
  );
}
