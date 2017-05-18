//
//  RNMarkedRangeTextView.h
//  RNMarkedRangeTextInput
//
//  Created by Bell Zhong on 2017/5/18.
//  Copyright © 2017年 shimo. All rights reserved.
//

#import "RCTTextView.h"

@interface RNMarkedRangeTextView : RCTTextView

@property (nonatomic, copy) RCTDirectEventBlock onMarkedRangeChanged;
@property (nonatomic, copy) RCTDirectEventBlock onChangeText;

@end
