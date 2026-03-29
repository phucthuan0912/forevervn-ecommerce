import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div className='space-y-6 py-4 sm:space-y-8 sm:py-6'>
            <section className='section-shell px-5 py-6 sm:px-8 sm:py-8'>
                <div className='mb-8 text-center'>
                    <Title text1={'ABOUT'} text2={'US'} />
                </div>

                <div className='grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12'>
                    <div className='overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_22px_45px_rgba(15,23,42,0.1)]'>
                        <img
                            className='w-full rounded-[22px] object-cover'
                            src={assets.about_img}
                            alt="About Forever"
                        />
                    </div>

                    <div className='space-y-5 text-sm leading-7 text-slate-500 sm:text-base'>
                        <p>
                            Forever ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa trải nghiệm mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản: tạo ra nền tảng nơi khách hàng có thể dễ dàng khám phá, tìm hiểu và mua sắm nhiều loại sản phẩm ngay tại nhà.
                        </p>
                        <p>
                            Kể từ khi thành lập, chúng tôi không ngừng nỗ lực tuyển chọn đa dạng sản phẩm chất lượng cao, đáp ứng mọi sở thích và nhu cầu. Từ thời trang và làm đẹp đến đồ điện tử và đồ gia dụng thiết yếu, chúng tôi cung cấp bộ sưu tập phong phú từ các thương hiệu và nhà cung cấp uy tín.
                        </p>

                        <div className='rounded-[24px] border border-[var(--border)] bg-white p-5'>
                            <b className='text-slate-900'>Sứ mệnh của chúng tôi</b>
                            <p className='mt-3'>
                                Sứ mệnh của Forever là trao quyền cho khách hàng bằng sự lựa chọn, tiện lợi và sự tự tin. Chúng tôi cam kết cung cấp trải nghiệm mua sắm vượt trội, từ việc duyệt sản phẩm đến giao hàng tận nơi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='space-y-5'>
                <div className='text-center'>
                    <Title text1={'WHY'} text2={'CHOOSE US'} />
                </div>

                <div className='grid gap-4 lg:grid-cols-3'>
                    <div className='section-shell p-6 sm:p-7'>
                        <b className='text-slate-900'>Quality Assurance</b>
                        <p className='mt-4 text-sm leading-7 text-slate-500'>
                            Chúng tôi tỉ mỉ lựa chọn và kiểm định từng sản phẩm để đảm bảo đáp ứng tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.
                        </p>
                    </div>

                    <div className='section-shell p-6 sm:p-7'>
                        <b className='text-slate-900'>Convenience</b>
                        <p className='mt-4 text-sm leading-7 text-slate-500'>
                            Với giao diện thân thiện và quy trình đặt hàng đơn giản, mua sắm chưa bao giờ dễ dàng đến thế.
                        </p>
                    </div>

                    <div className='section-shell p-6 sm:p-7'>
                        <b className='text-slate-900'>Exceptional Customer Service</b>
                        <p className='mt-4 text-sm leading-7 text-slate-500'>
                            Đội ngũ chuyên nghiệp của chúng tôi luôn sẵn sàng hỗ trợ bạn, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu.
                        </p>
                    </div>
                </div>
            </section>

            <NewsletterBox />
        </div>
    )
}

export default About
