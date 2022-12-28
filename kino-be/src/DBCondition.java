import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class DBCondition {
    Boolean flaga = false;
    Lock lock = new ReentrantLock();
    Condition start = lock.newCondition();

    void startSaving(){
        lock.lock();
        try{
            while(flaga)
                start.await();
            flaga = true;
        }catch(InterruptedException e){

        }finally{
            if(((ReentrantLock) lock).isHeldByCurrentThread())
                lock.unlock();
        }
    }

    void stopSaving(){
        lock.lock();
        flaga = false;
        start.signal();
        if(((ReentrantLock) lock).isHeldByCurrentThread())
            lock.unlock();
    }
}
