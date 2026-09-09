import { useState } from 'react';
import birthdayData from '../data/birthdayData';
import PasscodeGate from '../components/secret/PasscodeGate';
import Opening from '../components/secret/Opening';

function SecretRoom() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return (
      sessionStorage.getItem(
        "secret-room-unlocked",
      ) === "true"
    );
  });

  const [hasEntered, setHasEntered] = useState(false);

  if (!isUnlocked) {
    return (
      <PasscodeGate
        passcode={birthdayData.secretPasscode}
        onUnlock={() => setIsUnlocked(true)}
      />
    );
  }

  if (!hasEntered) {
    return (
      <Opening
        onEnter={() => setHasEntered(true)}
      />
    );
  }

  return (
    <main className="secret-room-placeholder">
      <h1>The secret room is open.</h1>
      <p>
        Hero, Memories, Story and the surprises
        are coming next.
      </p>
    </main>
  );
}

export default SecretRoom;