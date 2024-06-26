import ProfileAwardsList from './components/ProfileAwardsList/ProfileAwardsList';

function ProfileAwardsCard() {
  return (
    <article className="w-full flex flex-col gap-2 self-centertext-primary shadow-lg rounded-lg p-4 my-5">
      <ProfileAwardsList />
    </article>
  );
}

export default ProfileAwardsCard;
