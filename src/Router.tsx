import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
    chgTheme: () => void;
    toggle: boolean;
}

function Router({ chgTheme, toggle }: IRouterProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins chgTheme={chgTheme} />} />
                <Route path="/:coinId/*" element={<Coin toggle={toggle} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
