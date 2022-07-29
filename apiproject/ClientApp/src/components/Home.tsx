export default function Home() {
  return (
    <div>
      <h1 className="absolute h-outlet w-screen grid place-items-center text-center text-[40px] md:text-[48px] lg:text-[64px] text-white font-bold">Welcome to Grow Surveys</h1>
      <div className='max-h-outlet'>
        <img className='object-cover h-outlet w-screen' src="../../welcome.jpg" alt="background" />
      </div>
    </div>
  )
}