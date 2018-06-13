float wasmscroll(float max,float min,float v,float a,float o) {
  float s = v*(a - o);
  if(s>=max) {
    return max;
  }
  if(s<=min) {
    return min;
  }
  return s;
}

float wasmscrollreverse(float r,float max,float min,float v,float a,float o) {
  float s = r-v*(a - o);
  if(s>=max) {
    return max;
  }
  if(s<=min) {
    return min;
  }
  return s;
}