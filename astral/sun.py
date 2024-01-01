from astral.sun import sun
from astral import LocationInfo, Observer
import astral
from datetime import datetime, timezone, timedelta
from pprint import pprint

def get_sunrise_sunset(latitude, longitude, date):
    # city = LocationInfo(name='Custom City', region='Custom Region', timezone='UTC', latitude=latitude, longitude=longitude)
    # s = sun(city.observer, date=date)
    observer = Observer(latitude=latitude, longitude=longitude, elevation=179.6)
    s = sun(observer, date=date)
    pprint(s)
    pprint(astral.sun.daylight(observer, date))
    pprint(astral.sun.noon(observer, date))
    return s['sunrise'], s['sunset']

# Replace with desired coordinates and date
latitude = 39.176
longitude = -77.3026
date = datetime(2024, 1, 1, tzinfo=timezone(timedelta(hours=-5)))
#date = datetime(2024, 1, 1)

sunrise_time, sunset_time = get_sunrise_sunset(latitude, longitude, date)
print(f"On {date}, the sunrise will be at {sunrise_time} and the sunset will be at {sunset_time}.")
