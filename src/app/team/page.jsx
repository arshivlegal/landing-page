import Gradient from '@/components/ui/Gradient'
import Data from '@/Data/data.json'
import GetInTouch from '@/components/GetInTouch';
import TeamCard from '@/components/teamCard';
import Testimonials from '@/components/Testimonials';
const { pageTitle, description, section1, teamMember, section3, section4 } = Data.ourTeam;
const testimonial = Data?.testimonials || [];
function page() {
    return (
        <>
            <Gradient title={pageTitle} description={description} />
            <div className='w-full max-w-7xl mx-auto px-s16 md:px-s32 space-y-s40 md:space-y-s48 lg:space-y-s64'>
                <div className='space-y-s24'>
                    <h2 className='page-title-h2 text-accent-main'>{section1.heading}</h2>
                    <p className='body-large'>{section1.content}</p>
                </div>

                <div className='lg:space-y-s64'>
                    {Data.ourTeam.teamMember?.map((teamMember, index) => (
                        <TeamCard
                            key={index}
                            image={teamMember.dpImage}
                            heading={teamMember.heading}
                            content={teamMember.content}
                            imagePosition={index % 2 === 0 ? 'left' : 'right'}
                        />
                    ))}
                </div>

                <div className='space-y-s24'>
                    <h2 className='page-title-h2 text-accent-main'>{section3.heading}</h2>
                    <p className='body-large'>{section3.content}</p>
                </div>
                <div className='space-y-s24'>
                    <h2 className='page-title-h2 text-accent-main'>{section4.heading}</h2>
                    <Testimonials list={testimonial?.list || []} />
                    <p className="text-center body-small text-disable">{section4.content}</p>
                </div>
                <GetInTouch
                    variant="white"
                    height="220px"
                    title="Start the Conversation That Can Change Everything"
                    subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
                />
            </div>
        </>
    )
}

export default page
