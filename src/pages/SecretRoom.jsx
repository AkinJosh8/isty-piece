import { useState } from 'react';
import birthdayData from '../data/birthdayData';
import PasscodeGate from '../components/secret/PasscodeGate';
import Opening from '../components/secret/Opening';
import Hero from '../components/secret/Hero';
import Memories from '../components/secret/Memories';


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
    <main className="secret-room">
      <Hero />
      <Memories />
    </main>
  );
}

export default SecretRoom;