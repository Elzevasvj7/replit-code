import { useSnapshot } from 'valtio';
import state from './Status';

function Picker() {
  const snap = useSnapshot(state);
  return (
    <div style={{ display: snap.current ? 'block' : 'none' }}>
      <h1>{snap.current}</h1>
    </div>
  );
}
export default Picker;
