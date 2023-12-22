import ProfileAwardsList from '../ProfileAwardsList/ProfileAwardsList';

function ProfileAwardsCard() {
  return (
    <article className="flex flex-col gap-2 self-center p-4 text-primary shadow-lg rounded-lg w-full my-10">
      <div className="flex flex-col gap-3">
        <ProfileAwardsList />
      </div>
    </article>
  );
}

export default ProfileAwardsCard;
