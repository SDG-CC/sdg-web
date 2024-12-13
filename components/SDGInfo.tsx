
const SDGInfo = () => {
  return (
    <div className='w-full flex flex-row sm:flex-col md:flex-col lg:flex-row pt-3'>
        <div className='flex-1 min-h-fit'>
            <img src="/SDG-0.svg"/>
        </div>
        <div className='flex flex-1 flex-col gap-12 px-4'>
            <div className='font-sans w-5/6'>
                <h2 className='text-4xl font-extrabold pb-2 tracking-tighter'>About SDG Campus Club</h2>
                <p className='pr-4 font-medium'>The United Nations Sustainable Development Goals (SDGs) serve as a blueprint for creating a better and more sustainable future for everyone. The establishment of the SDG Campus Club, which focuses on promoting the 17 UN SDGs and organizing events and seminars to raise awareness on campus, addresses all facets of societal development. These include poverty alleviation, promoting healthy lifestyles, encouraging sustainable energy use, ensuring proper hygiene, empowering women, providing education for all, and more.</p>
            </div>
            <div className='font-sans w-3/5'>
            <h2 className='text-4xl font-extrabold pb-2 tracking-tighter'>SDG CC NITRkl</h2>
            <p className='pr-4 font-medium'>The SDG Campus Club is the official sustainability club of NIT Rourkela, committed to promoting the United Nations' Sustainable Development Goals through impactful events and initiatives. We regularly collaborate with social service clubs to drive awareness and action on environmental and social issues.</p>
            <p>For collaborations, partnerships, or inquiries, feel free to contact us at:</p>
            <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sdgcampusclub.nitrkl@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600"
                >
                sdgcampusclub.nitrkl@gmail.com
            </a>
            <p>Join us in building a sustainable future!</p>
            </div>
        </div>
    </div>
  )
}

export default SDGInfo