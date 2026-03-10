import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div>

            {/* ── ABOUT US ── */}
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'} />
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img
                    className='w-full md:max-w-[450px]'
                    src={assets.about_img}
                    alt="About Forever"
                />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>
                        Forever ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa trải nghiệm mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản: tạo ra nền tảng nơi khách hàng có thể dễ dàng khám phá, tìm hiểu và mua sắm nhiều loại sản phẩm ngay tại nhà.
                    </p>
                    <p>
                        Kể từ khi thành lập, chúng tôi không ngừng nỗ lực tuyển chọn đa dạng sản phẩm chất lượng cao, đáp ứng mọi sở thích và nhu cầu. Từ thời trang và làm đẹp đến đồ điện tử và đồ gia dụng thiết yếu, chúng tôi cung cấp bộ sưu tập phong phú từ các thương hiệu và nhà cung cấp uy tín.
                    </p>
                    <b className='text-gray-800'>Sứ mệnh của chúng tôi</b>
                    <p>
                        Sứ mệnh của Forever là trao quyền cho khách hàng bằng sự lựa chọn, tiện lợi và sự tự tin. Chúng tôi cam kết cung cấp trải nghiệm mua sắm vượt trội — từ việc duyệt sản phẩm đến giao hàng tận nơi.
                    </p>
                </div>
            </div>

            {/* ── WHY CHOOSE US ── */}
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className='flex flex-col md:flex-row text-sm mb-20'>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Quality Assurance:</b>
                    <p className='text-gray-600'>
                        Chúng tôi tỉ mỉ lựa chọn và kiểm định từng sản phẩm để đảm bảo đáp ứng tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.
                    </p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Convenience:</b>
                    <p className='text-gray-600'>
                        Với giao diện thân thiện và quy trình đặt hàng đơn giản, mua sắm chưa bao giờ dễ dàng đến thế.
                    </p>
                </div>

                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>
                        Đội ngũ chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu.
                    </p>
                </div>

            </div>

            {/* ── NEWSLETTER ── */}
            <NewsletterBox />

        </div>
    )
}

export default About