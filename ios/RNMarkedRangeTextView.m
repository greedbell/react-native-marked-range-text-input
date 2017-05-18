//
//  RNMarkedRangeTextView.m
//  RNMarkedRangeTextInput
//
//  Created by Bell Zhong on 2017/5/18.
//  Copyright © 2017年 shimo. All rights reserved.
//

#import "RNMarkedRangeTextView.h"

@implementation RNMarkedRangeTextView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    if ((self = [super initWithEventDispatcher:eventDispatcher])) {
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(textFieldChanged:) name:UITextViewTextDidChangeNotification object:nil];
        
    }
    return self;
}

- (void)dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UITextViewTextDidChangeNotification object:nil];
}

- (void)textFieldChanged:(NSNotification* )notification
{
    UITextView *textView = (UITextView*) [self valueForKey:@"_textView"];
    if (notification.object != textView) {
        return;
    }
    UITextRange *markedRange = textView.markedTextRange;
    NSString * markedText = [textView textInRange:markedRange];
    NSInteger start = [textView offsetFromPosition:[textView beginningOfDocument] toPosition:markedRange.start];
    NSInteger end = [textView offsetFromPosition:[textView beginningOfDocument] toPosition:markedRange.end];
    NSString *text = textView.text;
    if (end > start) {
        NSString *temp = @"";
        if (start > 0) {
            temp = [temp stringByAppendingString:[text substringToIndex:start]];
        }
        NSInteger length = text.length;
        if (end < length) {
            temp = [temp stringByAppendingString:[text substringFromIndex:end]];
        }
        text = temp;
    }
    _onMarkedRangeChanged(@{
                            @"markedRange": @{
                                    @"start": @(start),
                                    @"end": @(end),
                                    @"text": markedText
                                    },
                            });
    _onChangeText(@{
                    @"text": text,
                    });
}

@end
