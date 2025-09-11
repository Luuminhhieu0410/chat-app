import { Spinner } from '@/components/ui/shadcn-io/spinner';
const LoadingPage = () => {
    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <Spinner size={50}/>
        </div>
    )
}
export default LoadingPage;
