import json
import tornado
import tornado.httpclient
import urllib

class IWLHack():
    

    def fakepost(self):
        message = """In the darkness I dreamed of you
        Your presence upon my shoulders like a mantle
        Comforting and warm, sitting near
        When I woke you were not there
        The loss of the soft friendship shawl
        Left cold in the depths of my soul
        I wondered what you were doing this day
        Were you sleeping in, head buried under the covers
        Or were you waking and stumbling like me
        In the mirror I saw a blurry scene
        Like drowning in a pool of smoke and ashes
        The me reflected felt unworthy of your love
        So I brushed the dreams away
        Washed them down the drain with my shampoo bubbles
        But I couldn't help thinking of you all day
        Would your real presence be like my dream?
        Your voice as smooth and your eyes as full of me?
        Life is only perfect in the early morning quiet"""
        
        body_message = urllib.urlencode({"text" : message })
        request = tornado.httpclient.HTTPRequest( "http://iwl.me/", method="POST", body=body_message, user_agent="researcher/1.0")
        
        http = tornado.httpclient.HTTPClient()
        response = http.fetch(request)
        print response
        
        
def main():
    new_item = IWLHack()
    new_item.fakepost()
    
if __name__ == "__main__":
    main()    
        
        